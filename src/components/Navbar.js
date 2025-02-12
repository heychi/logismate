import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <h1 className="logo">Logismate</h1>

            <div className="menu">
                <button className="menu-item" onClick={() => navigate("/dashboard")}>
                    대시보드
                </button>
                <button className="menu-item">고객지원</button>
                <button className="menu-item" onClick={() => navigate("/login")}>
                    로그인
                </button>
                <button className="menu-item">한국어</button>
                <button className="menu-item search-icon">🔍</button>
            </div>
        </nav>
    );
};

export default Navbar;
