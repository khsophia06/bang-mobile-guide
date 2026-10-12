# BANG! 모바일 설명서

처음 플레이하는 사람을 위한 한글 BANG! 기본판 설명서입니다.

## 구성

- 홈: 인원 선택, 역할 구성 확인, 카드 검색
- 역할 및 승리조건: 카드를 눌러 상세 설명 확인
- 기본세팅: 실제 판 사진을 편집한 배치 예시와 준비 방법
- 내 턴: 카드 뽑기, 사용, 손패 정리와 공격·방어 규칙
- 플레이 중: 상황별 규칙
- 카드도감: 기본판 카드·역할·인물 검색

## 로컬에서 보기

저장소 폴더에서 아래 명령을 실행한 뒤 `http://localhost:8000`을 엽니다.

```sh
python -m http.server 8000
```

`standalone/bang-manual.html`은 이미지와 설명이 포함된 파일형 설명서입니다. 웹 글꼴은 온라인으로 불러옵니다.

## 파일

- `index.html`: 페이지 구성
- `style.css`, `figma.css`: 모바일 디자인
- `app.js`: 화면 이동, 역할 설명, 검색과 거리 체험
- `assets/`: 카드 이미지, 판 이미지, 총알 이미지와 카드 정보
- `standalone/`: 파일형 설명서

## 출처

기본판 규칙: [dV Games 공식 규칙](https://bang.dvgiochi.com/content/1/docs/01_bang_rules_EN.pdf).

한글판 카드 이미지는 톤즈 [테이블온너드]의 [뱅 룰설명](https://www.youtube.com/watch?v=GApFDV0QcAY)과 [인물 카드 설명](https://www.youtube.com/watch?v=d0wafjx8PP0) 영상 캡처입니다. 판과 총알 이미지는 제공받은 사진을 바탕으로 편집했습니다. 비공식 학습용 설명서이며 BANG! 및 카드 아트의 권리는 각 권리자에게 있습니다.

이 저장소에는 공개 배포 설정을 포함하지 않습니다.
