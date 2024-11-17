package com.example.connection.service;

import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import com.example.connection.mapper.FileMapper;
import com.example.connection.mapper.FreeboardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FreeboardServiceImpl implements FreeboardService {

    // 객체
    private final FreeboardMapper freeboardMapper;
    private final FileMapper fileMapper;

    // 파일 경로 설정
    @Value("C:/upload/")
    private String fileDir;

    // 게시글 리스트 조회
    @Override
    public List<FreeboardViewDTO> boardListViews() {
        return freeboardMapper.boardListViews();
    }

    // 게시글 페이징 처리
    @Override
    public List<FreeboardViewDTO> boardListPaging(Criteria criteria) {
        return freeboardMapper.boardListPaging(criteria);
    }

    @Override
    public int boardFindTotal() {
        return freeboardMapper.boardFindTotal();
    }

    // 게시글 상세페이지 조회
    @Override
    public FreeboardViewDTO selectBoard(Long freeboardNumber) {
        return freeboardMapper.selectBoard(freeboardNumber).orElseThrow(() -> new IllegalArgumentException("유효하지 않은 게시물 번호"));
    }

    // 게시글 조회수
    @Override
    public List<FreeboardDTO> selectAllByViews() {
        List<FreeboardDTO> freeboardList = freeboardMapper.selectAllByViews();

        return freeboardList.stream()
                .filter(freeboard -> freeboard.getFreeboardCategorySports() != null || freeboard.getFreeboardCategoryPost() != null)
                .sorted(Comparator.comparing(FreeboardDTO::getFreeboardView).reversed())
                .limit(4)
                .collect(Collectors.toList());
    }

    @Override
    public List<FreeboardDTO> selectByViews() {
        List<FreeboardDTO> freeboardList = freeboardMapper.selectAllByViews();

        return freeboardList.stream()
                .filter(freeboard -> freeboard.getFreeboardCategorySports() != null || freeboard.getFreeboardCategoryPost() != null)
                .sorted(Comparator.comparing(FreeboardDTO::getFreeboardView).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

    // 게시글 수정
    @Override
    public void updateBoard(FreeboardUpdateDTO freeboardUpdateDTO, List<MultipartFile> files) throws IOException {
        // 게시글 업데이트
        freeboardMapper.updateBoard(freeboardUpdateDTO);
        Long boardId = freeboardUpdateDTO.getFreeboardNumber();

        // 파일 처리
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                // 파일이 비어있으면 다음 파일로 넘어감
                continue;
            }

            try {
                // 파일 저장 및 DTO 생성
                FileDTO fileDTO = saveFile(file);
                fileDTO.setFreeboardNumber(boardId);

                // 파일 정보를 데이터베이스에 저장
                fileMapper.insertFile(fileDTO);
            } catch (IOException e) {
                // 파일 저장 중 오류 발생 시 처리
                // 예를 들어, 로그를 남기거나 사용자에게 오류 메시지를 전달할 수 있음
                throw new RuntimeException("파일 저장 중 오류가 발생했습니다.", e);
            }
        }
    }

    // 게시글 조회수 증가
    @Override
    public void boardViewCnt(Long freeboardNumber) {
        freeboardMapper.boardViewCnt(freeboardNumber);
    }

    // 게시글 삭제
    @Override
    public void removeBoard(Long freeboardNumber) {
        freeboardMapper.deleteBoard(freeboardNumber);
    }

    // 게시글 작성
    @Override
    public void insertBoard(FreeboardWriteDTO freeboardWriteDTO) {

        freeboardMapper.insertBoard(freeboardWriteDTO);
    }

    // 게시글 파일 삽입
    @Override
    public void registerFreeboardWithFile(FreeboardWriteDTO freeboardWriteDTO, List<MultipartFile> files) throws IOException {
        freeboardMapper.insertBoard(freeboardWriteDTO);
        Long boardNumber = freeboardWriteDTO.getFreeboardNumber();

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                break;
            }
            FileDTO fileDTO = saveFile(file);
            fileDTO.setFreeboardNumber(boardNumber);
            fileMapper.insertFile(fileDTO);
        }
    }

    // 게시글 파일 저장
    @Override
    public FileDTO saveFile(MultipartFile file) throws IOException {
        //사용자가 올린 파일이름(확장자를 포함한다)
        String originalFilename = file.getOriginalFilename();
        //파일 이름에 붙여줄 uuid 생성
        UUID uuid = UUID.randomUUID();
        //uuid와 파일이름 합쳐준다
        String systemName = uuid.toString() + "_" + originalFilename;
        //상위 경로와 하위 경로를 합쳐준다
        File uploadPath = new File(fileDir, getUploadPath());
        //경로가 존재하지 않는다면(폴더가 만들어지지 않닸다면)
        if (!uploadPath.exists()) {
            //경로에 필요한 모든 폴더를 생성한다
            uploadPath.mkdirs();
        }
        //전체경로와 파일이름을 연결한다
        File uploadFile = new File(uploadPath, systemName);
        //매개변수로 받은 Multipart 객체가 가진 파일을 우리가 만든 경로와 이름으로 저장한다
        file.transferTo(uploadFile);

        FileDTO fileDTO = new FileDTO();
        fileDTO.setFileServer(uuid.toString());
        fileDTO.setFileUser(originalFilename);
        fileDTO.setFileExt(getUploadPath());

        return fileDTO;
    }

    //파일에 저장할 날짜 반환
    private String getUploadPath() {
        return new SimpleDateFormat("yyyy/MM/dd").format(new Date());
    }

    // 특정 사람의 게시글 조회
    @Override
    public List<FreeboardDTO> findAllByAuthor(Long memberNumber) {
        List<FreeboardDTO> freeboardList = freeboardMapper.findAllByAuthorId(memberNumber);

        return freeboardList.stream()
                .filter(freeboard -> freeboard.getFreeboardCategorySports() != null || freeboard.getFreeboardCategoryPost() != null)
                .sorted(Comparator.comparing(FreeboardDTO::getFreeboardView).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

}
