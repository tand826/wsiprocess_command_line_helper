import React from 'react';
import './App.css';
import Card from './Card.js'

export default function App() {
  return (
    <div className="App-header">

      <div className="wsiprocess">
        <Card
          title="Whole Slide Image"
          className="wsi"
          question="Select target WSI."
          content="fileSelect"
          hidden=""
          required="True"
        />
        <Card
          title="Task"
          className="task"
          question="What task will you deal with?"
          content="radio Classification Detection Segmentation Not-Specified"
          hidden="yes"
          required="True"
        />
        <Card
          title="Annotation"
          className="annotation"
          question="Did you make annotation file?"
          content="fileSelect"
          hidden="yes"
          required="False"
        />
        <Card
          title="Inclusion"
          className="inclusion"
          question="Did you make inclusion file?"
          content="fileSelect"
          hidden="yes"
          required="False"
        />
        <Card
          title="Sizes"
          className="sizes"
          question="What size do you want the patches to be?"
          content="param PatchWidth 256 PatchHeight 256 OverlapWidth 1 OverlapHeight 1"
          hidden="yes"
          required="False"
        />
        <Card
          title="Detail"
          className="detail"
          question="How much do you want the patches to be on the annotation / foreground?"
          content="param OnAnnotation 0.8 OnForeground 0.8"
          hidden="yes"
          required="False"
        />
        <Card
          title="Save to"
          className="saveTo"
          question="Where do you want WSIPROCESS to output the result files?"
          content="directorySelect"
          hidden="yes"
          required="False"
        />
        <Card
          title="Check Sample"
          className="checkSample"
          question="Do you want to check the samples when the script starts / finished?"
          content="checkbox Start Finished"
          hidden="yes"
          required="False"
        />
        <Card
          title="Command"
          className="command"
          question="Command for you!"
          content="result"
          hidden="yes"
          required="Ready"
        />
      </div>

    </div>
  );
}
