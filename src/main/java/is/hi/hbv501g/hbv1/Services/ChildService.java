package is.hi.hbv501g.hbv1.Services;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Entities.Parent;

import java.util.List;

public interface ChildService {
    Child save(Child child);
    void delete(Child child);
    List<Child> findByParents(Parent parent);
    List<Child> findByDaycareWorker(DaycareWorker daycareWorker);
}
