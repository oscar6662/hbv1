package is.hi.hbv501g.hbv1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Hbv1Application {

    public static void main(String[] args) {
        SpringApplication.run(Hbv1Application.class, args);
    }

}


// This is team member Dagbjört Þorgrímsdóttir
// This is team member Óskar Helgi Berenguer
// This is tesm member Einar Páll Pálsson