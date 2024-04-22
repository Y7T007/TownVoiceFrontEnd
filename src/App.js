import React, { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import axios from 'axios';

function App() {
    const [user, setUser] = useState(null);
    const [token,setToken] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const idToken = await user.getIdToken(); // Get JWT token
                console.log('JWT Token:', idToken); // Log JWT token
                setToken(idToken);

                // Send a request to the Go backend
                axios.get('http://localhost:8082/verifytoken', {
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error.message);
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC8FNwCEJYyxe03lAL_EgFZ2z6WeXA1x1w&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1";
        script.defer = true;
        window.initMap = function() {
            // Your map initialization code here
        };
        document.head.appendChild(script);
    }, []);

    return (
        <div className="App">
            {user ? (
                <>
                    <p>Welcome, {user.displayName}</p>
                    the token is <br/>{token} <br/>
                    <button onClick={signOutUser}>Sign out</button>
                    <div id="map"></div>
                    <div id="infowindow-content">
                        <span id="place-name" className="title"></span><br />
                        <span id="place-address"></span>
                    </div>
                </>
            ) : (
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            )}
        </div>
    );
}

export default App;