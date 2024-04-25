import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/firstpage.css';
// import backgroundImage from './background.jpg'; // Import your background image

export default function FirstPage() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/login");
    }

    return (
        <div style={styles.containersbro}>
            <div style={styles.content}>
                <h1 style={styles.heading}>Welcome to Our Website</h1>
                <p style={styles.subheading}>Start your journey now!</p>
                <button onClick={handleSubmit} style={styles.button}>Get Started</button>
            </div>
        </div>
    );
}

const styles = {
    
    
    containersbro: {
        backgroundImage: 'linear-gradient(135deg, #4CAF50 0%, #FFFFFF 100%)',
        animation: 'movingBackground 10s linear infinite',
        height: '89vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    content: {
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        padding: '20px',
        borderRadius: '10px',
    },
    heading: {
        fontSize: '36px',
        marginBottom: '20px',
    },
    subheading: {
        fontSize: '24px',
        marginBottom: '30px',
    },
    button: {
        border: '2px solid black',
        backgroundColor: 'green',
        width: '150px',
        padding: '10px',
        fontSize: '18px',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
