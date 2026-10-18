
package in.mtk.dreamjournal.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record DreamResponse(
        Long id,
        String title,
        String description,
        LocalDate dreamDate,
        String mood,
        List<String> tags,
        LocalDateTime createdAt
) {
}

