package is.hi.hbv501g.hbv1.Services;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;

public interface ChildService {
    Child save(Child child);
    void delete(Child child);
}
