package com.example.connection.service;

import com.example.connection.domain.dto.MemberDTO;
import com.example.connection.domain.dto.MemberInfoDTO;
import com.example.connection.domain.dto.MemberSessionDTO;
import com.example.connection.domain.dto.MemberUpdateDTO;
import com.example.connection.domain.vo.MemberVO;
import org.apache.ibatis.javassist.bytecode.DuplicateMemberException;

public interface MemberService {
    // 회원가입
    void registerMember(MemberDTO memberDTO) throws DuplicateMemberException;
    // 로그인
    MemberSessionDTO loginMember(String memberEmail, String memberPassword);

    //시퀀스 저장
    long getNextMemberNumber();

    // 수정(프로필 수정)
    void updateMember(MemberUpdateDTO memberUpdateDTO);

    // 조회
    MemberDTO findByMemberNumber(long memberNumber);

    // 탈퇴
    void deleteMemberNumber(Long memberNumber);

    // 회원 정보 조회
    MemberInfoDTO memberInfo(Long memberNumber);

    // 이메일 확인
    boolean existsByEmail(String memberEmail);
}