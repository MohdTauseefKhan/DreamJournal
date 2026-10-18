
package in.mtk.dreamjournal.service;

import in.mtk.dreamjournal.dto.DreamRequest;
import in.mtk.dreamjournal.dto.DreamResponse;
import in.mtk.dreamjournal.entity.Dream;
import in.mtk.dreamjournal.entity.User;
import in.mtk.dreamjournal.repository.DreamRepository;
import in.mtk.dreamjournal.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DreamService {

    private final DreamRepository dreamRepository;
    private final UserRepository userRepository;

    public DreamService(
            DreamRepository dreamRepository,
            UserRepository userRepository
    ) {
        this.dreamRepository = dreamRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public DreamResponse createDream(String email, DreamRequest request) {
        User user = findUser(email);

        Dream dream = new Dream();
        dream.setUser(user);

        updateDreamFields(dream, request);

        return toResponse(dreamRepository.save(dream));
    }

    @Transactional
    public DreamResponse updateDream(
            String email,
            Long dreamId,
            DreamRequest request
    ) {
        User user = findUser(email);

        Dream dream = dreamRepository
                .findByIdAndUserId(dreamId, user.getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Dream not found"
                ));

        updateDreamFields(dream, request);

        return toResponse(dreamRepository.save(dream));
    }

    private void updateDreamFields(Dream dream, DreamRequest request) {
        dream.setTitle(request.title().trim());
        dream.setDescription(request.description().trim());
        dream.setDreamDate(request.dreamDate());
        dream.setMood(request.mood().trim());

        dream.setTags(request.tags() == null
                ? List.of()
                : request.tags().stream()
                .map(String::trim)
                .filter(tag -> !tag.isEmpty())
                .distinct()
                .toList());
    }

    @Transactional(readOnly = true)
    public List<DreamResponse> getDreams(String email) {
        User user = findUser(email);

        return dreamRepository
                .findAllByUserIdOrderByDreamDateDesc(user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<DreamResponse> searchDreams(String email, String title) {
        User user = findUser(email);

        return dreamRepository
                .findByUserIdAndTitleContainingIgnoreCaseOrderByDreamDateDesc(
                        user.getId(),
                        title
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void deleteDream(String email, Long dreamId) {
        User user = findUser(email);

        Dream dream = dreamRepository
                .findByIdAndUserId(dreamId, user.getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Dream not found"
                ));

        dreamRepository.delete(dream);
    }

    private User findUser(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));
    }

    private DreamResponse toResponse(Dream dream) {
        return new DreamResponse(
                dream.getId(),
                dream.getTitle(),
                dream.getDescription(),
                dream.getDreamDate(),
                dream.getMood(),
                List.copyOf(dream.getTags()),
                dream.getCreatedAt()
        );
    }
}
