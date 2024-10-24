import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/Navbar";
import PostList from "../components/ListScreen/PostsList";

function UserPage() {
  return (
    <Box>
      <ResponsiveAppBar />
      <PostList />
    </Box>
  );
}

export default UserPage;
