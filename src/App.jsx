import React, { useState } from "react";
import {
  Button,
  Container,
  createMuiTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  button: {
    height: "100%",
  },
  filesContainer: {
    padding: theme.spacing(2),
  },
}));

const formats = [
  "jpeg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "eps",
  "WebP",
  "svg",
  "pdf",
  "txt",
];

function App() {
  const classes = useStyles();
  const [format, setFormat] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSelect = (event) => {
    setFormat(event.target.value);
  };

  const handleFileSelected = (event) => {
    const files = Array.from(event.target.files);
    console.log("files:", files);
    setSelectedFiles(files);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                className={classes.button}
                startIcon={<CloudUpload />}
                variant="contained"
                color="secondary"
                component="label"
              >
                Load Image
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileSelected}
                />
              </Button>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" color="secondary">
                <InputLabel id="format-select-label">Format</InputLabel>
                <Select
                  labelId="format-select-label"
                  id="format-select-label"
                  value={format}
                  onChange={handleSelect}
                >
                  <div className={classes.filesContainer}>
                    {formats.map((format, index) => (
                      <MenuItem key={index} value={format}>
                        {format}
                      </MenuItem>
                    ))}
                  </div>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {selectedFiles.map((file, index) => {
            return (
              <Typography key={index}>
                {index + 1 + ". " + file.name}
              </Typography>
            );
          })}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
