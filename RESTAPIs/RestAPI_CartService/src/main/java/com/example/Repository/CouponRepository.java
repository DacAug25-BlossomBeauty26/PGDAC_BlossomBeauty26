package com.example.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Entities.Coupon;
import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

    Optional<Coupon> findByCodeAndActiveTrue(String code);
    Optional<Coupon> findByCode(String code);
}

