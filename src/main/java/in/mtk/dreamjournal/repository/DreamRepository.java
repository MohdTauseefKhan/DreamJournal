
package in.mtk.dreamjournal.repository;

import in.mtk.dreamjournal.entity.Dream;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DreamRepository extends JpaRepository<Dream, Long> {

    List<Dream> findAllByUserIdOrderByDreamDateDesc(Long userId);

    Optional<Dream> findByIdAndUserId(Long id, Long userId);

    List<Dream> findByUserIdAndTitleContainingIgnoreCaseOrderByDreamDateDesc(
            Long userId,
            String title
    );
}
