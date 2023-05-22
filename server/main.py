import openai

openai.api_key = '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'

def generate_completion(prompt, max_tokens=50):
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=0.7,
        n=1,
        stop=None
    )
    return response.choices[0].text.strip()

# CLI interaction
print("Welcome to the GPT CLI!")

while True:
    user_prompt = input("Enter your prompt (or 'exit' to quit): ")

    if user_prompt.lower() == 'exit':
        print("Goodbye!")
        break

    completion = generate_completion(user_prompt)
    print("GPT:", completion)
    print()
