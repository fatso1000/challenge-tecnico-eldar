import { Box } from "@mui/material";
import ResponsiveAppBar from "@components/shared/Navbar";
import PostList from "@components/specific/ListScreen/PostsList";

function UserPage() {
  return (
    <Box>
      <ResponsiveAppBar />
      <PostList />
    </Box>
  );
}

export default UserPage;
