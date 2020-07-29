package de.neuefische.consilboard.db;


import de.neuefische.consilboard.model.Client;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ClientDB extends PagingAndSortingRepository<Client, String> {

    Iterable<Client> findClientsByClientnameStartingWithAndUser(String query, String user);
    Iterable<Client> findAllByUser(String user);
}
