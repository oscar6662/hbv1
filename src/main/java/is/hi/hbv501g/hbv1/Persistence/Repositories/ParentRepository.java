package is.hi.hbv501g.hbv1.Persistence.Repositories;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.Parent;
import is.hi.hbv501g.hbv1.Persistence.Entities.SsnId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository of Parents
 */
public interface ParentRepository extends JpaRepository<Parent, Long> {
    Parent save(Parent parent);
    void delete(Parent parent);
    Parent findByChildren(Child child);
    Parent findParentById(Long id);
    Parent findParentByAuth0Id(String id);
}
