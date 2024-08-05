package com.example.connection.service;

import com.example.connection.domain.dto.MemberDTO;
import com.example.connection.domain.dto.MemberInfoDTO;
import com.example.connection.domain.dto.MemberSessionDTO;
import com.example.connection.domain.dto.MemberUpdateDTO;
import com.example.connection.domain.vo.MemberVO;
import com.example.connection.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.bytecode.DuplicateMemberException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberMapper memberMapper;

    // 회원가입
    @Override
    public void registerMember(MemberDTO memberDTO) throws DuplicateMemberException {
        if (memberMapper.existsByEmail(memberDTO.getMemberEmail())) {
            throw new DuplicateMemberException("이미 존재하는 이메일입니다: " + memberDTO.getMemberEmail());
        }
        memberMapper.insertMember(memberDTO);
    }

    // 로그인
    @Override
    public MemberSessionDTO loginMember(String memberEmail, String memberPassword) {
        return memberMapper.selectMemberInfo(memberEmail, memberPassword).orElseThrow(() -> new IllegalStateException("로그인 실패"));
    }

    @Override
    public long getNextMemberNumber() {
        return memberMapper.getNextMemberNumber();
    }

    @Override
    public void updateMember(MemberUpdateDTO memberUpdateDTO) {
        memberMapper.updateMember(memberUpdateDTO);
    }

    @Override
    public MemberDTO findByMemberNumber(long memberNumber) {
        return memberMapper.findByMemberNumber(memberNumber);
    }

    @Override
    public void deleteMemberNumber(Long memberNumber) {
        memberMapper.deleteMemberNumber(memberNumber);
    }

    @Override
    public MemberInfoDTO memberInfo(Long memberNumber) {
        return memberMapper.memberInfo(memberNumber);
    }

    @Override
    public boolean existsByEmail(String memberEmail) {
        return memberMapper.existsByEmail(memberEmail);
    }

}