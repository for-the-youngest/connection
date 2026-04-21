# ⚽ Connection

> 스포츠를 좋아하는 사람들을 위한 커뮤니티 게시판 웹 애플리케이션

<br>

## 📌 프로젝트 개요

Connection은 회원 가입을 통해 자유게시판과 리그 게시판에서 글을 작성하고, 다른 사용자와 소통할 수 있는 스포츠 커뮤니티 플랫폼입니다.

<br>

## 👥 팀원 소개

| 역할 | 이름 |
|------|------|
| 팀장 | 민병욱 |
| 부팀장 | 최정우 |
| 팀원 | 양효준 |
| 팀원 | 박동신 |

<br>

## 🛠 Skills

### 💬 커뮤니케이션
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

### 📁 파일 관리
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

### 🎨 화면 구현
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

### 💻 사용 언어
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Java](https://img.shields.io/badge/Java-E76F00?style=for-the-badge&logo=openjdk&logoColor=white)

### 🗄 데이터베이스
![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)

<br>

## ⚙️ 아키텍처

```
Controller → Service → Mapper (MyBatis) → Oracle DB
```

```
src/main/java/com/example/connection/
├── controller/         # 요청 처리 (MVC Controller, REST API)
│   ├── MemberController.java
│   ├── FreeboardController.java
│   ├── LeagueController.java
│   ├── NoticeController.java
│   ├── ReplyApi.java
│   └── FileApi.java
├── service/            # 비즈니스 로직
├── mapper/             # MyBatis Mapper 인터페이스
├── domain/
│   ├── dto/            # 데이터 전송 객체
│   └── vo/             # 도메인 객체
└── mybatis/            # MyBatis 설정
```

<br>

## 🔑 주요 기능

### 👤 회원 관리

- **회원가입** : 이름, 이메일, 비밀번호, 닉네임, 성별, 생년월일 입력
- **로그인 / 로그아웃** : 세션 기반 인증
- **마이페이지** : 내 정보 조회 및 인기 게시글 확인
- **회원정보 수정** : 이름, 닉네임, 성별, 생년월일 수정
- **회원 탈퇴** : 탈퇴 후 세션 자동 만료

---

### 📋 자유게시판

- **게시글 목록** : 페이징 처리, 정렬 기능
- **게시글 작성** : 스포츠 카테고리 선택, 파일 첨부 가능 (로그인 필수)
- **게시글 상세** : 조회수 자동 증가, 첨부 파일 조회
- **게시글 수정** : 작성자 본인만 수정 가능
- **게시글 삭제** : 작성자 본인만 삭제 가능
- **댓글** : 댓글 작성 / 조회 / 삭제, 댓글 페이징 처리 (REST API)

---

### 🏆 리그 게시판

- **게시글 목록** : 페이징 처리
- **게시글 작성** : 리그 카테고리 선택 (로그인 필수)
- **게시글 상세** : 리그 정보 상세 조회
- **게시글 수정 / 삭제**

---

### 📂 파일 업로드

- 게시글 작성 및 수정 시 파일 첨부 가능
- UUID 기반 서버 저장명 생성으로 파일명 충돌 방지
- 날짜별 폴더 구조로 파일 관리 (`yyyy/MM/dd`)
- REST API로 파일 목록 조회 및 이미지 반환

---

### 📢 공지사항

- 4개 카테고리의 공지사항 페이지 제공

---

### 🔧 관리자 페이지

- 전체 게시글 관리
- 리그 상세 관리
- 공지 작성 (summernote 에디터 사용)

---

### 📍 장소 찾기

- 스포츠 관련 장소 검색 기능

<br>

## 📐 ERD

🔗 [ERD 바로보기 (ERDCloud)](https://www.erdcloud.com/d/taj6q7RxQE4EpCdm9)

<br>

## 🗄 데이터베이스 주요 테이블

| 테이블 | 설명 |
|--------|------|
| CNN_MEMBER | 회원 정보 (번호, 이름, 이메일, 비밀번호, 닉네임, 성별, 생년월일) |
| 자유게시판 테이블 | 게시글 번호, 제목, 내용, 작성일, 스포츠/게시 카테고리, 조회수, 회원번호 |
| 리그게시판 테이블 | 게시글 번호, 제목, 내용, 작성일, 카테고리, 회원번호 |
| 파일 테이블 | 파일 번호, 원본명, 서버저장명, 확장자, 게시글 번호 |
| 댓글 테이블 | 댓글 번호, 내용, 작성일, 게시글 번호, 회원번호 |

<br>

## 🚀 실행 방법

### 1. 사전 요구사항

- Java 17
- Oracle DB 설치 및 실행 (포트: 1521)
- Gradle

### 2. DB 설정

`src/main/resources/application.properties` 파일에서 DB 접속 정보를 수정합니다.

```properties
spring.datasource.hikari.jdbc-url=jdbc:log4jdbc:oracle:thin:@//localhost:1521/XE
spring.datasource.hikari.username=YOUR_USERNAME
spring.datasource.hikari.password=YOUR_PASSWORD
```

### 3. 빌드 및 실행

```bash
./gradlew bootRun
```

### 4. 접속

```
http://localhost:8090/connection
```

<br>

## 📁 URL 구조

| URL | 설명 |
|-----|------|
| `/connection` | 메인 페이지 |
| `/connection/member/join` | 회원가입 |
| `/connection/member/login` | 로그인 |
| `/connection/member/mypage` | 마이페이지 |
| `/connection/board` | 자유게시판 목록 |
| `/connection/board/create` | 자유게시판 글 작성 |
| `/connection/board/post` | 자유게시판 상세 |
| `/connection/league` | 리그게시판 목록 |
| `/connection/league/create` | 리그게시판 글 작성 |
| `/connection/notice/notice1` | 공지사항 |
| `/connection/place/find-place` | 장소 찾기 |

<br>

## 💡 REST API

| Method | URL | 설명 |
|--------|-----|------|
| POST | `/v3/freeboard/{id}/reply` | 댓글 작성 |
| GET | `/v3/freeboard/{id}/replys` | 댓글 목록 조회 |
| GET | `/v4/freeboard/{id}/replys` | 댓글 페이징 조회 |
| DELETE | `/v3/freeboard/replys/{id}` | 댓글 삭제 |
| GET | `/v1/boards/{id}/files` | 게시글 파일 목록 |
| GET | `/v1/files` | 파일 조회 |
