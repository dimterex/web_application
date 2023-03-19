import moment from "moment";
import React from "react";


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, Paper } from "@mui/material";
import { MeetingsItem } from "../../../api/meetings/meetingsItem";

type MeetingProps = {
    event: MeetingsItem
};

export class Meeting extends React.Component<MeetingProps, {}> {

    render() {
        let starting_time = moment(this.props.event.start_time)
        let done = starting_time > moment()

        let time = starting_time.format('LT')

        const divStyle = {
            textDecoration: done ? 'inherit' : 'line-through', // note the capital 'W' here
        };

        var matches: Array<string> | null = this.props.event.description.match(/\bhttps?:\/\/\S+\b/gi);
        if (matches == null)
            matches = []

        return <Accordion>
            <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                <Typography style={divStyle}>{time} ({this.props.event.duration}h) {this.props.event.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <div key='1'>
                        { this.props.event.location == null ? null : <Link target="_blank" rel="noopener noreferrer" href={this.props.event.location.toString()}> {this.props.event.location}</Link> } 
                    </div>
                    
                    <div key='2'>
                        { this.props.event.description} 
                    </div>
                    
                    <div key='3'>
                        { 
                            matches.map((url, index) => (
                                <div key={index}>
                                    <Link target="_blank" rel="noopener noreferrer" href={url}>{url}</Link>
                                </div>
                            ))
                        }  
                    </div>   
                    
                </Typography>
            </AccordionDetails>
        </Accordion>
        
    }
}
