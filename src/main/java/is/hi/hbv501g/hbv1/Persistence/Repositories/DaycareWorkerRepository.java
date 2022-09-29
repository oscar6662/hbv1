package is.hi.hbv501g.hbv1.Persistence.Repositories;

import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DaycareWorkerRepository extends JpaRepository <DaycareWorker, UUID> {

    List<DaycareWorker> findByLocation(String location);
    List<DaycareWorker> findByLocationCode(int locationCode);

    //DaycareWorker findById(UUID id);
    //strange error with the UUID that i cannot seem to resolve

    List<DaycareWorker> findAll();
    DaycareWorker addDaycareWorker(DaycareWorker daycareWorker);
    void delete(DaycareWorker daycareWorker);

}

