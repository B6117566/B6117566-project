import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    imgPath:
      'https://im.uniqlo.com/global-cms/spa/res7bb57fef419b5f9b17dbf6738ccf61c8fr.jpg',
  },
  {
    imgPath:
      'https:////im.uniqlo.com/global-cms/spa/rescdbb28c2cd8785c21db1e95d293f79f3fr.jpg',
  },
  {
    imgPath:
      'https:////im.uniqlo.com/global-cms/spa/res02c63585602e25a0742fb8f91ffd446ffr.jpg',
  },
  {
    imgPath:
      'https:////im.uniqlo.com/global-cms/spa/res7b25769b4a28c8530078acd00e2483a3fr.jpg',
  },

];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '0.5rem',
    boxShadow: '0px 4px 6px 0 rgba(0, 0, 0, 0.1)',
  },
  img: {
    display: 'block',
    overflow: 'hidden',
    width: '100%',
  },
}));

function HomeCarousel() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;
  const interval = 5000

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={interval}
      >
        {tutorialSteps.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} alt='BANNER' src={step.imgPath} loading='lazy'/>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            ถัดไป
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            ย้อนกลับ
          </Button>
        }
      />
    </div>
  );
}

export default HomeCarousel;
