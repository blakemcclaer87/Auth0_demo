import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../custom.css';

export const Profile = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, getAccessTokenWithPopup  } = useAuth0();
    const [userMetadata, setUserMetadata]                               = useState(null);
    const [appMetaData, setAppMetaData]                                 = useState(null);
    const [formEyes, setFormEyes]                                       = useState("");
    const [formHeight, setFormHeight]                                   = useState(0);
    const [formAge, setFormAge]                                         = useState(0);
    const domain                                                        = "blakemcclaerdev.au.auth0.com";
    const [updateMessage, setUpdateMessage]                             = useState(null);
    const [offerMessage, setUpOfferMessage]                             = useState(null);
    const [collectedOffer, setUpCollectedOffer]                         = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            if (user) {

                try {
                    const accessToken = await getAccessTokenSilently({
                        audience: `https://${domain}/api/v2/`,
                        scope: "read:current_user read:current_user_metadata",
                    });
                    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                    const metadataResponse = await fetch(userDetailsByIdUrl, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    console.log(metadataResponse);

                    const { user_metadata, app_metadata } = await metadataResponse.json();
                    setUserMetadata(user_metadata);
                    setAppMetaData(app_metadata);
                    setFormAge(user_metadata.age);
                    setFormEyes(user_metadata.eye_colour);
                    setFormHeight(user_metadata.height);

                } catch (e) {
                    console.log(e.message);
                }
            }

        };

        getUserMetadata();
    }, [user]);

    async function updateUserMetadata(event) {
        setUpdateMessage("");
        try {
            userMetadata.eye_colour = formEyes;
            userMetadata.age        = formAge;
            userMetadata.height     = formHeight;

            const accessToken = await getAccessTokenSilently({
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user update:current_user_metadata",
            });
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

            const metadataResponse = await fetch(userDetailsByIdUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                },
                method: "PATCH",
                body: JSON.stringify({
                    user_metadata: userMetadata
                })
            });

            await metadataResponse.json();
            setUpdateMessage("User Metadata Updated Successfully.");
        } catch (e) {
            console.log(e.message);
        }
    }

    async function GetOffer(event) {
        setUpCollectedOffer(null);
        setUpOfferMessage("");
        try {

            const accessToken = await getAccessTokenSilently({
                audience: `https://quickstarts/api`,
                scope: "read:offers",
            });
            const userDetailsofferDetailsUrl = `https://localhost:44364/api/Offers?age=` + userMetadata.age + '&daysSinceLastCruise=' + appMetaData.days_since_last_cruise;
            const offersResponse = await fetch(userDetailsofferDetailsUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                },
                method: "GET"
            });

            const response = await offersResponse.json();
            setUpCollectedOffer(response);
            setUpOfferMessage("Offer Retrieved Successfully.");
        } catch (e) {
            console.log(e);
            if (e.error === 'consent_required') {
                await getAccessTokenWithPopup({
                    audience: 'https://quickstarts/api',
                    scope: 'read:offers',
                    domain: "blakemcclaerdev.au.auth0.com",
                    clientId:"itOXUq4FBQo4UHXACIjcgcevgOXra35F"
                })
            }
        }
    };

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (isAuthenticated) {
        if (user.email_verified) {
            return (
                (
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user['https://example.com/country']}</p>
                        <p>{user['https://example.com/timezone']}</p>
                        <h3>Additional User Details</h3>
                        {userMetadata ? (
                            <React.Fragment>
                                <div className="row">
                                    <label>
                                        Eye Colour
                                    </label>
                                    <input name="eyes" type="text" value={formEyes} onChange={e => setFormEyes(e.target.value)} />
                                </div>
                                 <div className="row">
                                    <label>
                                        Height
                                    </label>
                                    <input name="height" type="text" value={formHeight} onChange={e => setFormHeight(e.target.value)} />
                                </div>
                                <div className="row">
                                    <label>
                                        Age
                                    </label>
                                    <input name="age" type="text" value={formAge} onChange={e => setFormAge(e.target.value)} />
                                </div>
                                <div className="row">
                                    <button className="btn btn-primary btn-block auth0-buttons" onClick={(e) => updateUserMetadata(e)}>
                                        Update
                                    </button>
                                </div>
                                <div className="row">
                                    <p>
                                        {updateMessage}
                                    </p>
                                </div>
                            </React.Fragment>
                        ) : (
                                "No additional user details found"
                            )},
                        <h3>Cruise0 Platform Metrics</h3>
                        {appMetaData ? (
                            <React.Fragment>
                                <div className="row">
                                    <label>
                                        Days Since Last Cruise
                                    </label>
                                    <label>{appMetaData.days_since_last_cruise}</label>
                                </div>
                            </React.Fragment>
                        ) : (
                                "No additional app details found"
                            )},
                        <div className="row">
                            <button className="btn btn-primary btn-block auth0-buttons" onClick={(e) => GetOffer(e)}>
                                Get My Offer
                            </button>
                        </div>
                        <div className="row">
                            <p>
                                {offerMessage}
                            </p>
                        </div>
                        {collectedOffer ? (
                            <React.Fragment>
                                <div className="row">
                                    <label>
                                        Title:&nbsp;
                                    </label>
                                    <label>
                                        {collectedOffer.title}
                                    </label>
                                </div>
                                <div className="row">
                                    <label>
                                        Line:&nbsp;
                                    </label>
                                    <label>
                                        {collectedOffer.vendor}
                                    </label>
                                </div>
                                <div className="row">
                                    <label>
                                        Description:&nbsp;
                                    </label>
                                    <label>
                                        {collectedOffer.description}
                                    </label>
                                </div>
                                <div className="row">
                                    <label>
                                        Total Days:&nbsp;
                                    </label>
                                    <label>
                                        {collectedOffer.totalDays}
                                    </label>
                                </div>
                                <div className="row">
                                    <label>
                                        Price:&nbsp;
                                    </label>
                                    <label>
                                        {'$' + collectedOffer.price}
                                    </label>
                                </div>
                            </React.Fragment>
                        ) : 
                            (
                                "No Personalised offer collected yet, click the find offer button once you've applied the cruise passanger role to you account in the dashboard.."
                        )}
                    </div>
                )
            );
        } else {
            return (
                (
                    <div className="row justify-content-center">
                        <h3>You have not verified your email. You will not be able to see your profile until you do so.</h3>
                    </div>
                )
            );
        }
    } else {
        return (<div></div>)
    }

};

export default Profile;