import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  FormContainer, 
  ShortTextField, 
  NumberField, 
  DateField, 
  MultipleChoiceFIeld,
  InformationField, 
  SubmitField 
} from 'formzy'

const useStyles = makeStyles(() => ({
  fieldRoot: {
    '& $nextButton': {
      color: '#808080', 
      backgroundColor: '#eee',
    },
    '& $description': {
      color: '#eee',
    },
  },
  fieldContainer: {
    backgroundImage: 'url("https://gracefulresources.com/wp-content/uploads/2016/06/PenOnNotebookwComputerKeyboard1680.jpg")', 
    WebkitFilter: 'brightness(0.4)',
    filter: 'brightness(0.4)'
  },
  progressInnerContainer: {
    backgroundColor: '#555',
    '& $progressTransition': {
      backgroundColor: 'black' 
    },
  },
  title: {
    color: '#eee', 
    fontSize: 26,
  },
  nextActionDescription: {
    color: '#eee'
  },
  error: {
    maxWidth: 'fit-content', 
    opacity: 0.8,
  },
  multipleChoiceField: {
    '& $optionButton': {
      backgroundColor: '#ccc', 
      color: 'black', 
      borderColor: 'black', 
      width: '15%'
    },
    '& $optionButtonActive': {
      backgroundColor: '#555', 
      color: 'white'
    },
  },
  optionButton: {},
  optionButtonActive: {},
  description: {},
  progressTransition: {},
  nextButton: {},
}))
const style = {
  nextButton: { color: '#808080', backgroundColor: '#eee' },
  textInput: { color: '#eee' },
  numberInput: { color: '#eee' },
  dateInputLabel: { color: 'white' },
  dateInput: { backgroundColor: '#ccc', margin: '10px 0px 20px 0px' },
}

export default () => {
  const classes = useStyles({})
  const fieldClasses = {
    fieldRoot: classes.fieldRoot, 
    nextButton: classes.nextButton, 
    title: classes.title,
    description: classes.description,
    nextActionDescription: classes.nextActionDescription,
    error: classes.error
  }
  return (
    <FormContainer 
      showProgress={true}
      onSubmit={data => console.log(data)}
      classes={{
        fieldContainer: classes.fieldContainer,
        progressInnerContainer: classes.progressInnerContainer,
      }}
    >
      <InformationField 
        title="Hi, Welcome to Our Job Application Form" 
        description="Ready to begin?" 
        nextBtnText="Lets Go"
        classes={{...fieldClasses}}
      />
      <ShortTextField 
        title="First off, what's your first name?" 
        name="name" 
        minTextLength={2} 
        required 
        classes={{...fieldClasses}}
      />
      <MultipleChoiceFIeld 
        title="Nice to meet you {{_.name}}, what roles are you interested in?" 
        name="fruits" 
        options={['Front End Dev', 'Back End Dev', 'Full Stack Dev']} 
        multiple
        className={classes.multipleChoiceField}
        classes={{ 
          ...fieldClasses,
          optionButton: classes.optionButton,
          active: classes.optionButtonActive
        }}
      />
      <NumberField 
        title="How many years of experience do you have?" 
        name="noranges"
        min={0}
        defaultValue={0}
        style={style}
      />
      <DateField 
        title="When are you free for a chat?" 
        name="orrangedate" 
        required
        style={style}
      />
      <SubmitField 
        title="Thanks {{_.name}}, we will be in touch with you shortly!" 
        nextBtnText="Send Application" 
        style={style}
      />
    </FormContainer>
  )
}