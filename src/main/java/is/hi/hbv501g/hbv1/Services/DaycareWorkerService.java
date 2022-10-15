package is.hi.hbv501g.hbv1.Services;

import is.hi.hbv501g.hbv1.Persistence.Entities.Appetite;
import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;

import java.time.LocalDateTime;
import java.util.List;

public interface DaycareWorkerService {
    List<DaycareWorker> findByLocation(String location);
    List<DaycareWorker> findByLocationCode(String locationCode);
    DaycareWorker findDaycareWorkerById(Long id);
    List<DaycareWorker> findAll();
    DaycareWorker addDaycareWorker(DaycareWorker daycareWorker);
    DayReport createDayReport(
            DaycareWorker daycareWorker,
            Child child,
            LocalDateTime sleepFrom,
            LocalDateTime sleepTo,
            Appetite appetite,
            String comment);

    void delete(DaycareWorker daycareWorker);
}


