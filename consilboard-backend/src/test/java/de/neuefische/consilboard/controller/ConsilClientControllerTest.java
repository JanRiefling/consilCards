package de.neuefische.consilboard.controller;


import de.neuefische.consilboard.db.ClientDB;
import de.neuefische.consilboard.db.UserDB;
import de.neuefische.consilboard.dto.AddClientDto;
import de.neuefische.consilboard.model.Client;
import de.neuefische.consilboard.model.ConsilBoardUser;
import de.neuefische.consilboard.model.LoginData;
import de.neuefische.consilboard.utils.RandomIdUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ConsilClientControllerTest {

    @LocalServerPort
    public int port;

    @Autowired
    public TestRestTemplate restTemplate;

    @Autowired
    private ClientDB db;

    @Autowired
    public PasswordEncoder encoder;

    @Autowired
    public UserDB userDb;

    @MockBean
    private RandomIdUtil idUtils;

    @BeforeEach
    public void resetDatabase() {
        db.deleteAll();
        userDb.deleteAll();
    }

    private String loginUser() {
        String savePassword = "savePassword";
        ConsilBoardUser user = new ConsilBoardUser("superUser", encoder.encode(savePassword), "admin");
        userDb.save(user);

        String loginUrl = "http://localhost:" + port + "/auth/login";
        ResponseEntity<String> tokenResponse = restTemplate.postForEntity(loginUrl, new LoginData("superUser", "savePassword"), String.class);
        return tokenResponse.getBody();
    }

/*    @Test
    public void getIdeasShouldReturnAllIdeas() {
        //GIVEN
        String token = loginUser();

        String url = "http://localhost:" + port + "/api/ideas";
        db.save(new Client("1", "Alfo", "Some Fancy Description", "user1"));
        db.save(new Client("2", "Gerhard", "Some other Fancy Description", "superUser"));


        //WHEN
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity entity = new HttpEntity(headers);
        ResponseEntity<Idea[]> response = restTemplate.exchange(url, HttpMethod.GET, entity, Idea[].class);

        //THEN
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        Idea[] ideas = response.getBody();
        assertEquals(ideas.length, 2);
        assertEquals(ideas[0], new Idea("1", "Some Fancy Idea", "user1"));
        assertEquals(ideas[1], new Idea("2", "Some other Fancy Idea", "superUser"));
    }*/


    @Test
    public void addClientShouldAddClientToDB() {
        // GIVEN
        String token = loginUser();

        when(idUtils.generateRandomId()).thenReturn("some-random-id");

        AddClientDto addClientDto = new AddClientDto("some name");
        String url = "http://localhost:" + port + "/api/clients";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<AddClientDto> requestEntity = new HttpEntity<>(addClientDto, headers);

        // WHEN
        ResponseEntity<Client> putResponse = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Client.class);

        // THEN
        Client expectedClient = new Client("some-random-id","some name","superUser");
        assertEquals(HttpStatus.OK, putResponse.getStatusCode());
        assertNotNull(putResponse.getBody());
        assertEquals(expectedClient, putResponse.getBody());

        Optional<Client> byId = db.findById("some-random-id");
        assertTrue(byId.isPresent());
        assertEquals(byId.get(), expectedClient);
    }
}
