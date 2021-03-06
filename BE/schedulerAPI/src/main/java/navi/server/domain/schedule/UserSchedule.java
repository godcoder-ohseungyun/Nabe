package navi.server.domain.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import navi.server.domain.schedule.userScheduleSubclasses.AnnouncementSchedule;
import navi.server.domain.schedule.userScheduleSubclasses.SpecialSchedule;
import navi.server.domain.schedule.userScheduleSubclasses.PersonalSchedule;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserSchedule {
    private Long id;
    private String date;


    private Map<Long,PersonalSchedule> personalSchedules; //개인 일정 데이터


    public UserSchedule(String date) {
        this.id = 0l; //임시값 save에서 할당됨
        this.date = date;
        this.personalSchedules = new HashMap();

    }
}
