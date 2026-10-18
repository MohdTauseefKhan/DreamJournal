
package in.mtk.dreamjournal.controller;

import in.mtk.dreamjournal.dto.DreamRequest;
import in.mtk.dreamjournal.dto.DreamResponse;
import in.mtk.dreamjournal.service.DreamService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dreams")
public class DreamController {

    private final DreamService dreamService;

    public DreamController(DreamService dreamService) {
        this.dreamService = dreamService;
    }

    @PostMapping
    public ResponseEntity<DreamResponse> createDream(
            Authentication authentication,
            @Valid @RequestBody DreamRequest request
    ) {
        DreamResponse response = dreamService.createDream(
                authentication.getName(),
                request
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<DreamResponse>> getDreams(
            Authentication authentication,
            @RequestParam(required = false) String search
    ) {
        List<DreamResponse> dreams;

        if (search != null && !search.isBlank()) {
            dreams = dreamService.searchDreams(
                    authentication.getName(),
                    search.trim()
            );
        } else {
            dreams = dreamService.getDreams(authentication.getName());
        }

        return ResponseEntity.ok(dreams);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DreamResponse> updateDream(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody DreamRequest request
    ) {
        DreamResponse response = dreamService.updateDream(
                authentication.getName(),
                id,
                request
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDream(
            Authentication authentication,
            @PathVariable Long id
    ) {
        dreamService.deleteDream(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
