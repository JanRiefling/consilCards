package de.neuefische.consilboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Size;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCommentDto {
    @Size(min = 5, message = "comment min length 5")
    private String commentString;
}
