import { yellow } from "@mui/material/colors";

const styles = {
  sideBar: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  sideBarHeader: {
    height: "64px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sideBarFooter: {
    height: "64px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTable: {
    backgroundColor: yellow[700],
    color: "white",
    "&:hover": { backgroundColor: yellow[800] },
  },
  divDataTableMarca: {
    margin: "auto",
    height: "90%",
    width: "95%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  sidebarLabels: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    width: "80%",
    margin: "auto",
  },
  visibilityHidden: {
    visibility: "hidden",
    opacity: 0,
    transition: "visibility 0s linear 300ms, opacity 300ms",
  },
  visibilityVisible: {
    visibility: "visible",
    opacity: 1,
    transition: "visibility 0s linear 0s, opacity 300ms",
  },
};

export default styles;
