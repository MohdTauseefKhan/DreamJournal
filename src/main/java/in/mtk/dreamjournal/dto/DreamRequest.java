
package in.mtk.dreamjournal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record DreamRequest(

        @NotBlank(message = "Dream title is required")
        @Size(max = 150, message = "Title cannot exceed 150 characters")
        String title,

        @NotBlank(message = "Dream description is required")
        String description,

        @NotNull(message = "Dream date is required")
        LocalDate dreamDate,

        @NotBlank(message = "Mood is required")
        @Size(max = 30, message = "Mood cannot exceed 30 characters")
        String mood,

        @Size(max = 20, message = "You can add up to 20 tags")
        List<
                @NotBlank(message = "Tags cannot be blank")
                @Size(max = 50, message = "Each tag cannot exceed 50 characters")
                        String
                > tags

) {
}
