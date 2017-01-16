package com.route.controller;

import com.route.dao.RouteRepository;
import com.route.vo.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2017-01-16.
 */
@RestController
public class RouteController {

    @Autowired
    private RouteRepository routeRepository;

    @RequestMapping(value = "/routes",method = RequestMethod.GET)
    public List<Route> routes(){
        return routeRepository.findAll();
    }

    @RequestMapping(value = "/routeUpdateState",method = RequestMethod.POST)
    public void routeUpdateState(@RequestParam("name")String name,
                                        @RequestParam("state")String state){
        routeRepository.routeUpdateState(name,state);
    }
}
