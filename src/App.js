import React from 'react';
import './App.css';
import Card from './Card.js'

function App() {
  return (
    <div className="App-header">

      <div className="wsiprocess">
        <Card
          title="Whole Slide Image"
          question="Select target WSI."
          content="fileSelect"
          state=""
          required="True"
        />
        <Card
          title="Task"
          question="What task will you deal with?"
          content="radio Classification Detection Segmentation Not-Specified"
          state=""
          required="True"
        />
        <Card
          title="Annotation"
          question="Did you make annotation file?"
          content="fileSelect"
          state=""
          required="False"
        />
        <Card
          title="Inclusion"
          question="Did you make inclusion file?"
          content="fileSelect"
          state=""
          required="False"
        />
        <Card
          title="Sizes"
          question="What size do you want the patches to be?"
          content="param PatchWidth 256 PatchHeight 256 OverlapWidth 1 OverlapHeight 1"
          state=""
          required="False"
        />
        <Card
          title="Detail"
          question="How much do you want the patches to be on the annotation / foreground?"
          content="param OnAnnotation 1.0 OnForeground 1.0"
          state=""
          required="False"
        />
        <Card
          title="Save to"
          question="Where do you want WSIPROCESS to output the result files?"
          content="directorySelect"
          state=""
          required="False"
        />
        <Card
          title="Check Sample"
          question="Do you want to check the samples when the script starts / finished?"
          content="checkbox Start Finished"
          state=""
          required="False"
        />
      </div>

    </div>
  );
}

export default App;
