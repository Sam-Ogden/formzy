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

const useStyles = makeStyles({
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
  progressTransition: {}
})
const style = {
  title: { color: '#eee', fontSize: '26px' },
  description: { color: '#eee' },
  nextButton: { color: '#808080', backgroundColor: '#eee' },
  pressEnter: { color: '#eee' },
  textInput: { color: '#eee' },
  numberInput: { color: '#eee' },
  optionButton: { backgroundColor: '#ccc', color: 'black', borderColor: 'black', width: '15%' },
  optionButtonActive: { backgroundColor: '#555', color: 'white' },
  dateInputLabel: { color: 'white' },
  dateInput: { backgroundColor: '#ccc', margin: '10px 0px 20px 0px' },
  errorBar: { maxWidth: 'fit-content', opacity: 0.8 }
}

export default () => {
  const classes = useStyles()
  return (
    <FormContainer 
      showProgress={true}
      onSubmit={data => console.log(data)}
      classes={classes}
    >
      <InformationField 
        title="Hi, Welcome to Our Job Application Form" 
        description="Ready to begin?" 
        nextBtnText="Lets Go"
        style={style}
      />
      <ShortTextField 
        title="First off, what's your first name?" 
        name="name" 
        minTextLength={2} 
        required 
        style={style}
      />
      <MultipleChoiceFIeld 
        title="Nice to meet you {{_.name}}, what roles are you interested in?" 
        name="fruits" 
        options={['Front End Dev', 'Back End Dev', 'Full Stack Dev']} 
        multiple
        style={style}
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