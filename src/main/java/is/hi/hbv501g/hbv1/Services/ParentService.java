package is.hi.hbv501g.hbv1.Services;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Entities.Parent;

public interface ParentService {
    Boolean requestDaycareWorker(DaycareWorker daycareWorker, Parent parent);
    DayReport getChildReport(Child child);
}
