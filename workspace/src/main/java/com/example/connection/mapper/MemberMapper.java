package com.example.connection.mapper;

import com.example.connection.domain.dto.MemberDTO;
import com.example.connection.domain.dto.MemberInfoDTO;
import com.example.connection.domain.dto.MemberSessionDTO;
import com.example.connection.domain.dto.MemberUpdateDTO;
import com.example.connection.domain.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;

@Mapper
public interface MemberMapper {
    // 회원가입
    void insertMember(MemberDTO MemberDTO);

    // 로그인
    Optional<Long> selectMember(@Param("memberEmail") String memberEmail, @Param("memberPassword") String memberPassword);

    // 로그인
    Optional<MemberSessionDTO> selectMemberInfo(String memberEmail, String memberPassword);

    //시퀀스 저장
    long getNextMemberNumber();

    // 조회
    MemberDTO findByMemberNumber(long memberNumber);

    // 수정(프로필 정보)
    void updateMember(MemberUpdateDTO memberUpdateDTO);

    // 탈퇴
    void deleteMemberNumber(Long memberNumber);

    // 회원 정보 조회
    MemberInfoDTO memberInfo(Long memberNumber);
}