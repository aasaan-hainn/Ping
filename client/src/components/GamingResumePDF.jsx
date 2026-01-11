import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Svg,
    Path,
} from "@react-pdf/renderer";

// Ping logo URL (using public path)
const PING_LOGO_URL = "/favicon.png";

// Styles for the PDF - using built-in Helvetica font
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
        fontSize: 10,
        backgroundColor: "#ffffff",
    },
    // Header section
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    logoContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        border: "1px solid #333",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
        overflow: "hidden",
    },
    logoImage: {
        width: 40,
        height: 40,
        objectFit: "contain",
    },
    headerInfo: {
        flex: 1,
        alignItems: "center",
    },
    username: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 2,
    },
    fullName: {
        fontSize: 12,
        color: "#555",
        marginBottom: 8,
    },
    contactRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        width: "100%",
        fontSize: 8,
        color: "#666",
    },
    contactItem: {
        fontSize: 8,
        color: "#666",
    },
    // Tagline and language row
    taglineRow: {
        flexDirection: "row",
        marginBottom: 15,
        gap: 10,
    },
    taglineBox: {
        flex: 3,
        border: "0.5px solid #333",
        borderRadius: 20,
        padding: "8px 15px",
        justifyContent: "center",
        alignItems: "center",
    },
    languageBox: {
        flex: 1,
        border: "0.5px solid #333",
        borderRadius: 8,
        padding: "8px 12px",
        justifyContent: "center",
        alignItems: "center",
    },
    taglineText: {
        fontSize: 10,
        textAlign: "center",
    },
    languageText: {
        fontSize: 9,
    },
    // Main content row
    mainContent: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 15,
        height: 200,
    },
    // Game Info section
    gameInfoBox: {
        flex: 1,
        border: "0.5px solid #333",
        borderRadius: 15,
        padding: 12,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: "1px solid #ddd",
    },
    gameHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    gameLogoContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        border: "0.5px solid #333",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        overflow: "hidden",
    },
    gameLogoImage: {
        width: 32,
        height: 32,
        objectFit: "contain",
    },
    gameLogoFallback: {
        fontSize: 6,
        textAlign: "center",
    },
    gameName: {
        fontSize: 11,
        fontWeight: "bold",
    },
    gameStats: {
        marginTop: 5,
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    statDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#333",
        marginRight: 8,
    },
    statLine: {
        width: 1,
        height: 15,
        backgroundColor: "#333",
        marginLeft: 2.5,
        marginBottom: -3,
    },
    statLabel: {
        fontSize: 9,
    },
    statValue: {
        fontSize: 9,
        fontWeight: "bold",
        marginLeft: 5,
    },
    // Skills section
    skillsBox: {
        flex: 1,
        border: "0.5px solid #333",
        borderRadius: 15,
        padding: 12,
    },
    skillItem: {
        marginBottom: 6,
    },
    skillText: {
        fontSize: 9,
    },
    // Experience section
    experienceBox: {
        border: "0.5px solid #333",
        borderRadius: 15,
        padding: 15,
        minHeight: 180,
    },
    experienceContent: {
        marginTop: 10,
    },
    subSection: {
        marginBottom: 15,
    },
    subSectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    subSectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        border: "0.5px solid #333",
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginLeft: 10,
    },
    timelineLine: {
        width: 2,
        height: 20,
        backgroundColor: "#333",
        marginLeft: 5,
        marginBottom: -3,
    },
    itemLine: {
        flexDirection: "row",
        marginBottom: 5,
        paddingLeft: 20,
    },
    itemText: {
        fontSize: 9,
        flex: 1,
        borderBottom: "1px solid #ddd",
        paddingBottom: 3,
    },
    // Footer
    footer: {
        position: "absolute",
        bottom: 20,
        left: 30,
        right: 30,
        textAlign: "center",
        fontSize: 9,
        color: "#666",
    },
});

// Gaming Resume PDF Document Component
const GamingResumePDF = ({
    user,
    gameExperiences,
    teams,
    tournaments,
    gamingSetup,
    socials,
    supportedGames,
}) => {
    // Get primary game
    const primaryGame = gameExperiences?.find((g) => g.isPrimary) || gameExperiences?.[0];

    // Get game logo URL from supported games
    const getGameLogoUrl = (gameName) => {
        const game = supportedGames?.find(
            (g) => g.name?.toLowerCase() === gameName?.toLowerCase()
        );
        return game?.logo || null;
    };

    const primaryGameLogo = getGameLogoUrl(primaryGame?.game);

    // Get languages as string
    const languagesText = user?.languages?.length
        ? user.languages.join(", ")
        : "English";

    // Build contact items with icons - only include email, phone, instagram, youtube
    const contactItems = [];
    if (user?.email) contactItems.push({ type: "email", value: user.email });
    if (user?.phoneNumber) contactItems.push({ type: "phone", value: user.phoneNumber });
    if (socials?.instagram) contactItems.push({ type: "instagram", value: `@${socials.instagram}` });
    if (socials?.youtube) contactItems.push({ type: "youtube", value: socials.youtube });

    // Social icon components for PDF
    const SocialIcon = ({ type }) => {
        const iconSize = 8;
        const iconStyle = { width: iconSize, height: iconSize, marginRight: 3 };

        switch (type) {
            case "email":
                return (
                    <Svg style={iconStyle} viewBox="0 0 24 24">
                        <Path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#666" />
                    </Svg>
                );
            case "phone":
                return (
                    <Svg style={iconStyle} viewBox="0 0 24 24">
                        <Path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#666" />
                    </Svg>
                );
            case "instagram":
                return (
                    <Svg style={iconStyle} viewBox="0 0 24 24">
                        <Path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" fill="#E1306C" />
                    </Svg>
                );
            case "youtube":
                return (
                    <Svg style={iconStyle} viewBox="0 0 24 24">
                        <Path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" fill="#FF0000" />
                    </Svg>
                );
            case "twitter":
                return (
                    <Svg style={iconStyle} viewBox="0 0 16 16">
                        <Path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H0.316l5.733-6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" fill="#333" />
                    </Svg>
                );
            case "twitch":
                return (
                    <Svg style={iconStyle} viewBox="0 0 16 16">
                        <Path d="M4.5 1L2 3.5v9h3V15l2.5-2.5h2L14 8V1H4.5zM13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z" fill="#9146FF" />
                    </Svg>
                );
            case "discord":
                return (
                    <Svg style={iconStyle} viewBox="0 0 24 24">
                        <Path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.46 13.46 0 0 0-1.063 2.193 18.068 18.068 0 0 0-4.57 0 13.513 13.513 0 0 0-1.07-2.193.076.076 0 0 0-.078-.037 19.736 19.736 0 0 0-4.885 1.515.077.077 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2" />
                    </Svg>
                );
            default:
                return null;
        }
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    {/* Ping Logo */}
                    <View style={styles.logoContainer}>
                        <Image src={PING_LOGO_URL} style={styles.logoImage} />
                    </View>

                    {/* User Info */}
                    <View style={styles.headerInfo}>
                        <Text style={styles.username}>{user?.username || "username"}</Text>
                        <Text style={styles.fullName}>
                            {user?.fullName || "firstname lastname"}
                        </Text>
                        <View style={styles.contactRow}>
                            {contactItems.map((item, index) => (
                                <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                                    <SocialIcon type={item.type} />
                                    <Text style={styles.contactItem}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Tagline and Language Row */}
                <View style={styles.taglineRow}>
                    <View style={styles.taglineBox}>
                        <Text style={styles.taglineText}>
                            {user?.tagline || "Professional Gamer | Content Creator"}
                        </Text>
                    </View>
                    <View style={styles.languageBox}>
                        <Text style={styles.languageText}>{languagesText}</Text>
                    </View>
                </View>

                {/* Main Content Row */}
                <View style={styles.mainContent}>
                    {/* Game Info Box */}
                    <View style={styles.gameInfoBox}>
                        <Text style={styles.sectionTitle}>Game Info</Text>

                        {/* Game Header */}
                        <View style={styles.gameHeader}>
                            <View style={styles.gameLogoContainer}>
                                {primaryGameLogo ? (
                                    <Image src={primaryGameLogo} style={styles.gameLogoImage} />
                                ) : (
                                    <Text style={styles.gameLogoFallback}>GAME</Text>
                                )}
                            </View>
                            <Text style={styles.gameName}>
                                {primaryGame?.game || "Game Name"}
                            </Text>
                        </View>

                        {/* Game Stats */}
                        <View style={styles.gameStats}>
                            <View style={styles.statItem}>
                                <View style={styles.statDot} />
                                <Text style={styles.statLabel}>Role:</Text>
                                <Text style={styles.statValue}>
                                    {primaryGame?.role || "N/A"}
                                </Text>
                            </View>
                            <View style={styles.statLine} />

                            <View style={styles.statItem}>
                                <View style={styles.statDot} />
                                <Text style={styles.statLabel}>Current Rank:</Text>
                                <Text style={styles.statValue}>
                                    {primaryGame?.rank || "N/A"}
                                </Text>
                            </View>
                            <View style={styles.statLine} />

                            <View style={styles.statItem}>
                                <View style={styles.statDot} />
                                <Text style={styles.statLabel}>Peak Rank:</Text>
                                <Text style={styles.statValue}>
                                    {primaryGame?.peakRank || "N/A"}
                                </Text>
                            </View>
                            <View style={styles.statLine} />

                            <View style={styles.statItem}>
                                <View style={styles.statDot} />
                                <Text style={styles.statLabel}>DPI:</Text>
                                <Text style={styles.statValue}>
                                    {gamingSetup?.dpi || "N/A"}
                                </Text>
                            </View>
                            <View style={styles.statLine} />

                            <View style={styles.statItem}>
                                <View style={styles.statDot} />
                                <Text style={styles.statLabel}>Sen:</Text>
                                <Text style={styles.statValue}>
                                    {gamingSetup?.sensitivity || "N/A"}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Skills Box */}
                    <View style={styles.skillsBox}>
                        <Text style={styles.sectionTitle}>Skills</Text>

                        {user?.skills?.length > 0 ? (
                            user.skills.slice(0, 10).map((skill, index) => (
                                <View key={index} style={styles.skillItem}>
                                    <Text style={styles.skillText}>• {skill}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={{ fontSize: 9, color: "#999" }}>No skills added</Text>
                        )}
                    </View>
                </View>

                {/* Experience Section */}
                <View style={styles.experienceBox}>
                    <Text style={styles.sectionTitle}>Experience</Text>

                    <View style={styles.experienceContent}>
                        {/* Teams */}
                        <View style={styles.subSection}>
                            <View style={styles.subSectionHeader}>
                                <View style={styles.timelineLine} />
                                <Text style={styles.subSectionTitle}>Teams</Text>
                            </View>
                            {teams?.length > 0 ? (
                                teams.slice(0, 4).map((team, index) => (
                                    <View key={index} style={{ marginBottom: 8, paddingLeft: 20 }}>
                                        <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                                            {team.name}
                                        </Text>
                                        {team.details && (
                                            <Text style={{ fontSize: 8, color: "#666", marginTop: 2 }}>
                                                {team.details}
                                            </Text>
                                        )}
                                    </View>
                                ))
                            ) : (
                                <View style={styles.itemLine}>
                                    <Text style={styles.itemText}>No team history added</Text>
                                </View>
                            )}
                        </View>

                        {/* Tournaments */}
                        <View style={styles.subSection}>
                            <View style={styles.subSectionHeader}>
                                <View style={styles.timelineLine} />
                                <Text style={styles.subSectionTitle}>Tournament</Text>
                            </View>
                            {tournaments?.length > 0 ? (
                                tournaments.slice(0, 4).map((tournament, index) => (
                                    <View key={index} style={{ marginBottom: 8, paddingLeft: 20 }}>
                                        <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                                            {tournament.name}
                                            {tournament.placement && ` - ${tournament.placement}`}
                                        </Text>
                                        {tournament.description && (
                                            <Text style={{ fontSize: 8, color: "#666", marginTop: 2 }}>
                                                {tournament.description}
                                            </Text>
                                        )}
                                    </View>
                                ))
                            ) : (
                                <View style={styles.itemLine}>
                                    <Text style={styles.itemText}>No tournament history added</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    © Ping: The Professional Network for Gamers and Esports Talent
                </Text>
            </Page>
        </Document>
    );
};

export default GamingResumePDF;
