import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      /** Profile */
      profile: {
        padding: 24,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      profileAvatarWrapper: {
        position: 'relative',
      },
      profileAvatar: {
        width: 86,
        height: 86,
        borderRadius: 9999,
      },
      profileName: {
        marginTop: 20,
        fontSize: 19,
        fontWeight: '600',
        color: '#414d63',
        textAlign: 'center',
      },
      profileAddress: {
        marginTop: 5,
        fontSize: 16,
        color: '#989898',
        textAlign: 'center',
      },
      /** Section */
      section: {
        paddingHorizontal: 24,
      },
      sectionTitle: {
        paddingVertical: 12,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
      },
      /** Row */
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
      },
      rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 9999,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      rowLabel: {
        fontSize: 17,
        fontWeight: '400',
        color: '#0c0c0c',
      },
      rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
});

export default styles;

