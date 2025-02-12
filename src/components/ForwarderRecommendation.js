import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // 기존 상단바 컴포넌트
import "../styles/ForwarderRecommendation.css";

// 예시 데이터: AI기반 추천포워더
const aiRecommendedForwarders = [
    {
        id: 1,
        logo: "/assets/corp1.png", // 로컬 이미지 경로 (실제 파일 경로에 맞게 수정)
        expertise: "해상, 항공",
        companyName: "Forwarder A",
        estimatedCost: "₩1,000,000 ~ ₩1,500,000",
        rating: 4.5,
        reviewCount: 23,
    },
    {
        id: 2,
        logo: "/assets/corp2.png",
        expertise: "특송",
        companyName: "Forwarder B",
        estimatedCost: "₩900,000 ~ ₩1,300,000",
        rating: 4.2,
        reviewCount: 15,
    },
];

// 예시 데이터: 일반 포워더
const regularForwarders = [
    {
        id: 3,
        logo: "/assets/corp1.png",
        expertise: "해상",
        companyName: "Forwarder C",
        estimatedCost: "₩800,000 ~ ₩1,200,000",
        rating: 4.0,
        reviewCount: 8,
    },
    {
        id: 4,
        logo: "/assets/corp2.png",
        expertise: "항공",
        companyName: "Forwarder D",
        estimatedCost: "₩1,100,000 ~ ₩1,600,000",
        rating: 4.3,
        reviewCount: 20,
    },
];

const ForwarderRecommendation = () => {

    // 기본 정보 변경 드롭다운 상태
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // 기본 정보 입력값 (드롭다운 항목)
    const [basicInfo, setBasicInfo] = useState({
        transport: [],         // 운송수단: 해상, 항공, 특송 (다중 선택)
        departure: "",         // 출발지 (텍스트 입력)
        arrival: "",           // 도착지 (텍스트 입력)
        cargoType: [],         // 화물종류: 일반, 냉장, 냉동 (다중 선택)
        cargoSize: "",         // 화물크기 및 무게: FCL, LCL (단일 선택)
        departureDate: "",     // 출발예정일
        arrivalDate: ""        // 최소 도착 희망일
    });

    // 포워더 추천 조건 선택 상태
    const [recommendation, setRecommendation] = useState({
        inlandTransport: [],         // 내륙 운송: 철도, 트럭 (다중 선택)
        additionalServices: [],      // 추가 서비스: 창고보관, 화물포장, 통관대행, 본선인도, 서류대행 (다중 선택)
        insurance: [],               // 보험 종류 (다중 선택)
        tradeTerms: [],              // 거래조건 (다중 선택)
        costRange: "",               // 운송비용 범위 (텍스트 입력)
        additionalRequirements: []   // 기타 요구사항 (다중 선택)
    });

    // 다중 선택 토글 함수 (기본정보와 추천 조건 모두 사용)
    const toggleSelection = (field, value, isBasic = false) => {
        if (isBasic) {
            setBasicInfo((prev) => {
                const arr = prev[field];
                if (arr.includes(value)) {
                    return { ...prev, [field]: arr.filter((item) => item !== value) };
                } else {
                    return { ...prev, [field]: [...arr, value] };
                }
            });
        } else {
            setRecommendation((prev) => {
                const arr = prev[field];
                if (arr.includes(value)) {
                    return { ...prev, [field]: arr.filter((item) => item !== value) };
                } else {
                    return { ...prev, [field]: [...arr, value] };
                }
            });
        }
    };

    const navigate = useNavigate();

    const handleReset = () => {
        setBasicInfo({
            transport: [],
            departure: "",
            arrival: "",
            cargoType: [],
            cargoSize: "",
            departureDate: "",
            arrivalDate: ""
        });
        setRecommendation({
            inlandTransport: [],
            additionalServices: [],
            insurance: [],
            tradeTerms: [],
            costRange: "",
            additionalRequirements: []
        });
    };

    // forwarder 상세페이지로 이동하는 함수
    const goToDetail = (id) => {
        navigate(`/forwarder/${id}`);
    };

    const handleReviewClick = (e, id) => {
        e.stopPropagation();
        navigate(`/forwarder/${id}/reviews`);
    };
    const handleChatClick = (e, id) => {
        e.stopPropagation();
        navigate(`/forwarder/${id}/chat`);
    };
    const handleContractClick = (e, id) => {
        e.stopPropagation();
        navigate(`/forwarder/${id}/contract`);
    };

    // 별 아이콘 렌더링 함수: rating(5점 만점)을 반올림하여 ★를 출력
    const renderStars = (rating) => {
        const stars = Math.round(rating);
        return "★".repeat(stars);
    };

    return (
        <div>
            <Navbar />
            <div className="recommendation-page">
                {/* 기본 정보 변경 드롭다운 메뉴 */}
                <div className="basic-info-dropdown">
                    <button
                        className="dropdown-toggle"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        기본 정보 변경 | 고객님이 입력하신 정보를 바탕으로 표시합니다. {dropdownOpen ? "▲" : "▼"}
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            {/* 운송수단 */}
                            <div className="dropdown-row">
                                <span>운송수단:</span>
                                <div className="option-group">
                                    {["해상", "항공", "특송"].map((option) => (
                                        <span
                                            key={option}
                                            className={`option-item ${basicInfo.transport.includes(option) ? "selected" : ""
                                                }`}
                                            onClick={() =>
                                                toggleSelection("transport", option, true)
                                            }
                                        >
                                            {option}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 출발지 */}
                            <div className="dropdown-row">
                                <span>출발지:</span>
                                <input
                                    type="text"
                                    value={basicInfo.departure}
                                    onChange={(e) =>
                                        setBasicInfo({ ...basicInfo, departure: e.target.value })
                                    }
                                    placeholder="출발지 입력"
                                />
                            </div>

                            {/* 도착지 */}
                            <div className="dropdown-row">
                                <span>도착지:</span>
                                <input
                                    type="text"
                                    value={basicInfo.arrival}
                                    onChange={(e) =>
                                        setBasicInfo({ ...basicInfo, arrival: e.target.value })
                                    }
                                    placeholder="도착지 입력"
                                />
                            </div>

                            {/* 화물종류 */}
                            <div className="dropdown-row">
                                <span>화물종류:</span>
                                <div className="option-group">
                                    {["일반", "냉장", "냉동"].map((option) => (
                                        <span
                                            key={option}
                                            className={`option-item ${basicInfo.cargoType.includes(option) ? "selected" : ""
                                                }`}
                                            onClick={() =>
                                                toggleSelection("cargoType", option, true)
                                            }
                                        >
                                            {option}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 화물크기 및 무게 */}
                            <div className="dropdown-row">
                                <span>화물크기 및 무게:</span>
                                <div className="option-group">
                                    {["FCL", "LCL"].map((option) => (
                                        <span
                                            key={option}
                                            className={`option-item ${basicInfo.cargoSize === option ? "selected" : ""
                                                }`}
                                            onClick={() =>
                                                setBasicInfo({ ...basicInfo, cargoSize: option })
                                            }
                                        >
                                            {option}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 출발예정일 */}
                            <div className="dropdown-row">
                                <span>출발예정일:</span>
                                <input
                                    type="date"
                                    value={basicInfo.departureDate}
                                    onChange={(e) =>
                                        setBasicInfo({
                                            ...basicInfo,
                                            departureDate: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            {/* 최소 도착 희망일 */}
                            <div className="dropdown-row">
                                <span>최소 도착 희망일:</span>
                                <input
                                    type="date"
                                    value={basicInfo.arrivalDate}
                                    onChange={(e) =>
                                        setBasicInfo({ ...basicInfo, arrivalDate: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* 포워더 추천 조건 선택 */}
                <div className="recommendation-conditions">

                    {/* 내륙 운송 */}
                    <div className="condition-row">
                        <div className="condition-header">내륙 운송</div>
                        <div className="condition-options">
                            {["철도", "트럭"].map((option) => (
                                <span
                                    key={option}
                                    className={`option-item ${recommendation.inlandTransport.includes(option) ? "selected" : ""
                                        }`}
                                    onClick={() => toggleSelection("inlandTransport", option, false)}
                                >
                                    {option}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 추가 서비스 */}
                    <div className="condition-row">
                        <div className="condition-header">추가 서비스</div>
                        <div className="condition-options">
                            {["창고보관", "화물포장", "통관대행", "본선인도", "서류대행"].map((option) => (
                                <span
                                    key={option}
                                    className={`option-item ${recommendation.additionalServices.includes(option) ? "selected" : ""
                                        }`}
                                    onClick={() => toggleSelection("additionalServices", option, false)}
                                >
                                    {option}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 보험 종류 - 두 줄 배치 */}
                    <div className="condition-row">
                        <div className="condition-header">보험 종류</div>
                        <div className="condition-options insurance-options">
                            {[
                                "보함가입 안함",
                                "기본 운송 보험(전손보험)",
                                "전위험 보험(All Risk)",
                                "특정 위험 보험(화재, 침수, 충돌 등)",
                                "냉장화물 전용 보험",
                                "위험물 전용 보험",
                            ].map((option) => (
                                <span
                                    key={option}
                                    className={`option-item ${recommendation.insurance.includes(option) ? "selected" : ""
                                        }`}
                                    onClick={() => toggleSelection("insurance", option, false)}
                                >
                                    {option}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 거래조건 */}
                    <div className="condition-row">
                        <div className="condition-header">거래조건</div>
                        <div className="condition-options">
                            {["FOB", "CFR", "CIF", "DAP", "DPU", "DDP", "ETC"].map((option) => (
                                <span
                                    key={option}
                                    className={`option-item ${recommendation.tradeTerms.includes(option) ? "selected" : ""
                                        }`}
                                    onClick={() => toggleSelection("tradeTerms", option, false)}
                                >
                                    {option}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 운송비용 범위 */}
                    <div className="condition-row">
                        <div className="condition-header">운송비용 범위</div>
                        <div className="condition-options">
                            <input
                                type="text"
                                value={recommendation.costRange}
                                onChange={(e) =>
                                    setRecommendation({ ...recommendation, costRange: e.target.value })
                                }
                                placeholder="예: 1000 ~ 5000"
                            />
                        </div>
                    </div>

                    {/* 기타 요구사항 */}
                    <div className="condition-row">
                        <div className="condition-header">기타 요구사항</div>
                        <div className="condition-options">
                            {["냉동 컨테이너", "위험물 취급", "CCTV 모니터링"].map((option) => (
                                <span
                                    key={option}
                                    className={`option-item ${recommendation.additionalRequirements.includes(option) ? "selected" : ""
                                        }`}
                                    onClick={() => toggleSelection("additionalRequirements", option, false)}
                                >
                                    {option}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 하단 액션 버튼 영역 */}
                <div className="action-buttons">
                    <button className="reset-button" onClick={handleReset}>
                        초기화
                    </button>
                    <button className="search-button" onClick={() => navigate()}>
                        검색
                    </button>
                </div>

                {/* 포워더 리스트 섹션 */}
                <div className="forwarder-list-section">
                    <div className="list-title">AI기반 추천포워더</div>
                    <div className="forwarder-list">
                        {aiRecommendedForwarders.map((forwarder) => (
                            <div
                                key={forwarder.id}
                                className="forwarder-card"
                                onClick={() => goToDetail(forwarder.id)}
                            >
                                <div className="profile-header">
                                    <img
                                        src={forwarder.logo}
                                        alt={`${forwarder.companyName} 로고`}
                                        className="forwarder-logo"
                                    />
                                </div>
                                <div className="profile-body">
                                    <div className="expertise">
                                        {forwarder.expertise}
                                    </div>
                                    <div className="profile-info">
                                        <div className="info-row">
                                            <span className="info-label">업체명</span>
                                            <span className="info-value">{forwarder.companyName}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">예상 운임 비용</span>
                                            <span className="info-value">{forwarder.estimatedCost}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">예상 운송 시간</span>
                                            <span className="info-value">{forwarder.transitTime}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">평점</span>
                                            <span className="info-value">{renderStars(forwarder.rating)}</span>
                                        </div>
                                        <div className="info-row review-row">
                                            <button
                                                className="review-button"
                                                onClick={(e) => handleReviewClick(e, forwarder.id)}
                                            >
                                                후기보기&gt;
                                            </button>
                                            <span className="review-count">{forwarder.reviewCount}개</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-footer">
                                    <button
                                        className="chat-button"
                                        onClick={(e) => handleChatClick(e, forwarder.id)}
                                    >
                                        실시간 채팅
                                    </button>
                                    <button
                                        className="contract-button"
                                        onClick={(e) => handleContractClick(e, forwarder.id)}
                                    >
                                        계약요청
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="list-title">포워더</div>
                    <div className="forwarder-list">
                        {regularForwarders.map((forwarder) => (
                            <div
                                key={forwarder.id}
                                className="forwarder-card"
                                onClick={() => goToDetail(forwarder.id)}
                            >
                                <div className="profile-header">
                                    <img
                                        src={forwarder.logo}
                                        alt={`${forwarder.companyName} 로고`}
                                        className="forwarder-logo"
                                    />
                                </div>
                                <div className="profile-body">
                                    <div className="expertise">
                                        {forwarder.expertise}
                                    </div>
                                    <div className="profile-info">
                                        <div className="info-row">
                                            <span className="info-label">업체명</span>
                                            <span className="info-value">{forwarder.companyName}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">예상 운임 비용</span>
                                            <span className="info-value">{forwarder.estimatedCost}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">예상 운송 시간</span>
                                            <span className="info-value">{forwarder.transitTime}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">평점</span>
                                            <span className="info-value">{renderStars(forwarder.rating)}</span>
                                        </div>
                                        <div className="info-row review-row">
                                            <button
                                                className="review-button"
                                                onClick={(e) => handleReviewClick(e, forwarder.id)}
                                            >
                                                후기보기&gt;
                                            </button>
                                            <span className="review-count">{forwarder.reviewCount}개</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-footer">
                                    <button
                                        className="chat-button"
                                        onClick={(e) => handleChatClick(e, forwarder.id)}
                                    >
                                        실시간 채팅
                                    </button>
                                    <button
                                        className="contract-button"
                                        onClick={(e) => handleContractClick(e, forwarder.id)}
                                    >
                                        계약요청
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForwarderRecommendation;
