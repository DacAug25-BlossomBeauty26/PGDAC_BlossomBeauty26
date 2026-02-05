package com.example.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entities.Coupon;
import com.example.Service.CouponService;

@RestController
@RequestMapping("/api/cart")
//@CrossOrigin(origins = "http://localhost:3000")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping("/getallcoupons")
    public List<Coupon> getAllCoupons() {
        return couponService.getAllCoupons();
    }
}
