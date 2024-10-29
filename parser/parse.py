from pydantic import BaseModel, Field
from typing import List
from openai import OpenAI
import json

OUTPUT_JSON_FILE_PATH = "databaseSummary.json"

# Initialize OpenAI client
client = OpenAI(api_key="")

class Program(BaseModel):
    program_name: str = Field(..., description="Name of the program.")
    agency: str = Field(..., description="Agency administering the program.")
    description: str = Field(..., description="Brief description of the program.")
    website: str = Field(..., description="List of relevant websites.")
    eligibility: str = Field(..., description="List of eligibility criteria.")
    limitations: str = Field(..., description="List of limitations.")
    amount: str = Field(..., description="Information on benefit amount.")
    how_to_apply: str = Field(..., description="Instructions on how to apply.")
    linked_services: str = Field(..., description="Any linked services.")
    right_to_appeal: str = Field(..., description="Appeal rights information.")
    retroactive: str = Field(..., description="Retroactive eligibility information.")
    other: str = Field(..., description="Any other information")

class Programs(BaseModel):
    programs: List[Program]

with open("database.txt", "r") as file:
    data = file.read()
print(data)

# Define message and response format
messages = [
    {"role": "system", "content": (
"Convert the following text into structured JSON format. Simply categorize them into the different fields. Summarize information concisely. If information does not fall into any of the fields, place in the other field. Assume that information that appears after a heading field but before a different field belongs to the first field. You should information on each of the following: TAFDC, EITC, SNAP, Lifeline Program, WIC, Fuel Assistance or LIHEAP, School Breakfast/Lunch,Massachusetts Senior Nutrition Program,  MassHealth (Medicaid),ConnectorCare, Health Safety Net (HSN), Medicare, Prescription Advantage (PA), Child Care Financial Assistance (CCFA), Head Start, HomeBASE, RAFT, MRVP,   Emergency Assistance (EA), HomeBASE, Residential Assistance for Families in Transition (RAFT) , Unemployment & Career Centers Program Name: Massachusetts Rental Voucher Program (MRVP), Unemployment Insurance (UI), Worker’s Comp,  Veterans’ Services,EAEDC,SSI, SSDI, Social Security" )},
    {"role": "user", "content": data}
]
# Set up response with schema
completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=messages,
    response_format=Programs 
)

#  Extract and display parsed response
program_data = completion.choices[0].message.parsed

# Save as JSON file
with open(OUTPUT_FILE_PATH, "w") as json_file:
    json.dump(program_data.model_dump(), json_file, indent=4)


