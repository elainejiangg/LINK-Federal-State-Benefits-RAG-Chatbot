from pydantic import BaseModel, Field
from typing import List
from openai import OpenAI
import json

OUTPUT_JSON_FILE_PATH = "database.json"

# Initialize OpenAI client
client = OpenAI(api_key="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")

# Define JSON schema using Pydantic
# class Eligibility(BaseModel):
#     description: str
#     criteria: list[str] = Field(..., description="List of eligibility criteria.")

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

data = """Program Name: SSI
Supplementary Security Income
Agency: United States Social Security Administration
Description: Federally funded program to provide monthly cash payments via direct deposit or paper checks to very low-income individuals who are elderly, blind, or disabled. Massachusetts supplements the federal SSI monthly amount to make it higher.
Website: www.ssa.gov/ssi & www.ssa.gov/ssi/text-understanding-ssi.htm
Eligibility:
An individual is eligible if he/she is low income with few resources and is also over 65, or blind, or disabled (often must meet complex eligibility requirements to establish disability, generally involving much documentation and/or a medical exam). Disabled or blind children whose parents have little income may be eligible as well. Cash and assets above $2000 for individuals or $3000 per couple count against applicant, but not car or property that is “essential to self-support.”
Availability/Limitations:
Agency may be able to do one emergency advance payment for applicants facing financial crisis, no higher than $999. Applicant should apply for/receive EAEDC while waiting for SSI determination.
Homeless individuals can receive full SSI benefits for 6 out of 9 months living in a shelter, see www.ssa.gov/ssi/spotlights/spot-homeless.htm for more information.
Immigrants: Those who fall into one of the seven “qualified aliens” categories are eligible, see www.ssa.gov/ssi/spotlights/spot-non-citizens.htm for more information.
Amount:
Maximum benefits for elderly: $735 from federal + $128 from state; For disabled: $733 from federal + $114 from state; For blind: $733 from federal +$149 from state.
How to Apply:
Visit local Social Security Office, find via secure.ssa.gov/ICON/main.jsp
Boston Social Security Office: Room 148, 10 Causeway Street, Boston, MA 02222
Apply via phone: 1-800-772-1213 or TDD: 1-800-325-0778
Linked Services? Application for SSI is also an application for Social Security. Recipients are automatically eligible for MassHealth and SNAP benefits.
Right to appeal? If denied, must appeal within 60 days of initial decision to have case reconsidered. If appeal within 10 days of benefit being cut back or terminated, applicant will continue receiving full benefit until appeal is heard.
Retroactive? Yes, benefits go back to date of application, but state will first take out the amount of EAEDC benefits it paid during the time period that the applicant was waiting for SSI acceptance.
Developed by Action for Boston Community Development, Inc.

Program Name: TAFDC
Transitional Aid to Famtilies with Dependent Children
Agency: Massachusetts Department of Transitional Assistance (DTA)
Description: Combined state and federally funded program which provides monthly cash payments to very low income and low asset-holding families.This is an economic assistance (cash benefit) program that helps pregnant individuals, families and caregivers explore opportunities, improve their finances, and reach their goals.
Website: https://www.mass.gov/how-to/apply-for-tafdc 
https://dtaconnect.eohhs.mass.gov/ 
Eligibility:
To be eligible, an individual must: 
Have children 18 or younger,  
Are pregnant and are due in less than 4 months; if you are under age 20 you may be eligible at any stage of pregnancy, and/or
Are a caregiver for a child you are related to but who is not your biological or adopted child. As a caregiver, you can apply for TAFDC for yourself and the child(ren) or only the child(ren) in your care. If you apply only for the child(ren) DTA will not look at your income when you apply, even though the application is in your name. If the child in your case has income, that may affect eligibility.
You live in Massachusetts,
You or someone in your family are a U.S. citizen or an eligible immigrant, and
Your income is below the TAFDC limits. Your family's gross income must be under the income limit. (Gross income is the amount before things like taxes are taken out.) 
The income limit is based on your family size and the type of housing you live in.
There are different rules if you are a teen parent under age 18 living with your parent(s).
How do I know if my family’s income is below the TAFDC limit?
Add up all income before taxes or other deductions. Do not count income of a foster child or someone who gets SSI. 
If you are working, subtract $200 from your monthly gross earnings. Then, if you got TAFDC in the last 4 months, subtract half of the rest of your gross earnings. These are deductions. 
If you pay for child care, tell DTA during your application interview. We may be able to subtract more of your earnings.

TAFDC Eligibility Chart
Family Size
Public or subsidized housing
Private housing
1
$513
$553
2
$648
$688
3
$783
$823
4
$912
$952
5
$1,045
$1,085
6
$1,183
$1,223
7
$1,316
$1,356
8
$1,448
$1,488
Each additional household member
+$139
+139


What are the rules if I am a teen parent under age 18 and I live with my parent(s)?
If you are a teen parent and you live with your parent(s), monthly gross income must be less than the amounts below.


TAFDC Eligibility Chart for parents under age 18
Family size
Income
1
$2,510
2
$3,407
3
$4,303
4
$5,200
5
$6,097
6
$6,993
7
$7,890
8
$8,787
Each additional household member
+$897


Child Support rules for TAFDC: Every child who gets TAFDC must have a child support case unless they live with both parents. But, you may not have to apply for child support for a child if you have experienced domestic violence or have safety concerns.  Tell us if you are worried about this.

If you do not already have a child support order, DTA will connect you to the Department of Revenue (DOR). DOR can help you establish paternity and get a child support order.

The state of Massachusetts must keep any child support paid for children who get TAFDC. If a child’s parent (who does not live with the child) pays child support while you get TAFDC, you will get the first $50 each month. This is in addition to TAFDC.

Can DTA help connect me to employment and training services?

DTA will connect all applicants over 18 who can work to JobQuest - the online system connecting people to the MassHire Career Center network. Some applicants must register as part of their TAFDC application.

You can register now for access to free tools and resources to support your career pathway. DTA can also help you register after you apply. Learn more and register here.

Disability accommodation: If you have a disability or health problem that makes it hard for you to do something DTA asks, you can ask for help. This is called an accommodation. If you need assistance, you can contact your case manager or call the DTA Assistance line to be connected to a Client Assistance Coordinator.

Safety concerns or other issues because of domestic violence: If you are dealing with the impacts of domestic violence, DTA can help. The Domestic Violence (DV) Unit can help address safety concerns and other impacts of domestic violence. Find your local DV specialist. If it is an emergency or after hours, call SAFELINK at (877) 785‐2020.

Limitations:
For most families, benefits are only available for 24 out of every 60 months (i.e. 2 out of 5 years), but there are exceptions to the rule for some recipients. The adult recipient of TAFDC can be working and still receive these benefits.

Immigrants: Many immigrants who legally entered the country after 8/22/96 face a five year wait before becoming eligible (but not veterans, refugees, asylees and some others).

Amount assigned per family:

Family members
No rent allowance
With rent allowance
1
$513
$553
2
$648
$688
3
$783
$823
4
$912
$952
5
$1,045
$1,085
6
$1,183
$1,223
7
$1,316
$1,356
8
$1,316
$1,356
9
$1,448
$1,488
10
$1,714
$1,754
Increment
$139
$139


Agency information:
DTA office: 1-800-249-2007
DTA Recipient Services Unit: 1-800-445-6604
"""

with open("database.txt", "r") as file:
    data = file.read()
print(data)

# Define message and response format
messages = [
    {"role": "system", "content": (
"Convert the following text into structured JSON format. Simply categorize them into the different fields. If information does not fall into any of the fields, place in the other field. Do not summarize. Leave text as raw. Ensure that you do not leave out any information. Assume that information that appears after a heading field but before a different field belongs to the first field. You should information on each of the following: TAFDC, EITC, SNAP, Lifeline Program, WIC, Fuel Assistance or LIHEAP, School Breakfast/Lunch,Massachusetts Senior Nutrition Program,  MassHealth (Medicaid),ConnectorCare, Health Safety Net (HSN), Medicare, Prescription Advantage (PA), Child Care Financial Assistance (CCFA), Head Start, HomeBASE, RAFT, MRVP,   Emergency Assistance (EA), HomeBASE, Residential Assistance for Families in Transition (RAFT) , Unemployment & Career Centers Program Name: Massachusetts Rental Voucher Program (MRVP), Unemployment Insurance (UI), Worker’s Comp,  Veterans’ Services,EAEDC,SSI, SSDI, Social Security" )},
    {"role": "user", "content": data}
]

# # Set up response with schema
completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=messages,
    response_format=Programs 
)

# # Extract and display parsed response
program_data = completion.choices[0].message.parsed

# Save as JSON file
with open('database4.json', "w") as json_file:
    json.dump(program_data.model_dump(), json_file, indent=4)


