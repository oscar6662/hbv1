package is.hi.hbv501g.hbv1.Services;

import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface DaycareWorkerService {
    List<DaycareWorker> findByLocation(String location);
    List<DaycareWorker> findByLocationCode(int locationCode);
    Optional<DaycareWorker> findById(Long id);
    List<DaycareWorker> findAll();
    DaycareWorker addDaycareWorker(DaycareWorker daycareWorker);
    void delete(Optional<DaycareWorker> daycareWorker);
}


