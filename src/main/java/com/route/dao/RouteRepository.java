package com.route.dao;

import com.route.vo.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by Administrator on 2017-01-16.
 */
@Repository
public class RouteRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional(readOnly = true)
    public List<Route> findAll() {
        StringBuffer sql =new StringBuffer();
        sql.append("select a.name,a.area,b.update_time,a.state from");
        sql.append(" (select name,mac,area,state from bd_center.device where valid=1) a left join");
        sql.append(" (select ap,MAX(data_time) update_time from main_frame.data_ap group by ap) b");
        sql.append(" on a.mac=b.ap");
        sql.append(" order by area asc");
        return jdbcTemplate.query(sql.toString(), new RouteRowMapper());
    }

    public void routeUpdateState(final String name,final String state) {
        jdbcTemplate.update(
                "update bd_center.device set state=? where name=?",
                new Object[]{state,name});
    }

    class RouteRowMapper implements RowMapper<Route> {
        @Override
        public Route mapRow(ResultSet rs, int rowNum) throws SQLException {
            Route route = new Route();
            route.setName(rs.getString("name"));
            route.setArea(rs.getString("area"));
            route.setUpdate_time(rs.getString("update_time"));
            route.setState(rs.getString("state"));
            return route;
        }
    }
}
