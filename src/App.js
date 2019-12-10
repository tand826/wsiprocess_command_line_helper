import React from 'react';
import './App.css';
import Wsi from './WsiCard.js';
import Task from './TaskCard.js';
import Annotation from './AnnotationCard.js';
import Inclusion from './InclusionCard.js';
import Size from './SizeCard.js';
import OnDetail from './OnDetailCard.js';
import SaveTo from './SaveToCard.js';
import CheckSample from './CheckSampleCard.js'

function App() {
  return (
    <div className="App-header">

      <div className="wsiprocess">
        <Wsi
          title="Whole Slide Image"
          question="Select your WSI."
          state="on"
          required="True"
        />
        <Task
          title="Task"
          question="What task will you deal with?"
          state="off"
          required="True"
        />
        <Annotation
          title="Annotation"
          question="Did you make annotation file?"
          state="off"
          required="False"
        />
        <Inclusion
          title="Inclusion"
          question="Did you make inclusion file?"
          state="off"
          required="False"
        />
        <Size
          title="Sizes"
          question="What size do you want the patches to be?"
          state="off"
          required="False"
        />
        <OnDetail
          title="Detail"
          question="How much do you want the patches to be on the annotation / foreground?"
          state="off"
          required="False"
        />
        <SaveTo
          title="Save to"
          question="Where do you want WSIPROCESS to output the result files?"
          state="off"
          required="False"
        />
        <CheckSample
          title="Check Sample"
          question="Do you want to check the samples when the script starts / finished?"
          state="off"
          required="False"
        />
      </div>

      <div className="vid2img">
      </div>
    </div>
  );
}

export default App;
