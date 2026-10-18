
package in.mtk.dreamjournal.dto;

public record AuthResponse(
        String token,
        Long id,
        String name,
        String email
) {
}
