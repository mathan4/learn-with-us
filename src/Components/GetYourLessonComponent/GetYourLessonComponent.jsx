import React from "react";
import { Button } from "../ui/button.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useForm } from "react-hook-form";
import axios from "axios";

const GetYourLessonComponent = () => {
  const form = useForm({
    defaultValues: {
      Topic: "",
      GradeLevel: "",
      Concepts: "",
      Materials: "",
      LearningObjectives: "",
      LessonOutline: "",
    },
  });
  const apiKey = "AIzaSyCZfpV_NgDGBnlqxBDRXUgN06A4OSwCmaA";
  const onSubmit = (fieldData) => {
    console.log("Form submitted:", fieldData);
    const data = {
        contents: [
          {
            parts: [
              {
                text: `Please generate a lesson plan using the following details, and come up with activities based on the topic:
      
                Topic: ${fieldData.Topic}
                Summary: A brief summary of the topic.
                Date: ${fieldData.Date}
                Subject: ${fieldData.Subject}
                Year Group or Grade Level: ${fieldData.GradeLevel}
                
                Main Topic or Unit: ${fieldData.Topic}
                Subtopics or Key Concepts: ${fieldData.Concepts}
                
                Materials Needed:
                ${fieldData.Materials}
                
                Learning Objectives:
                ${fieldData.LearningObjectives}
                
                Lesson Outline: Please provide activities specific to the topic '${fieldData.Topic}'
                
                Below is sample activity and timing and you should provide activites for '${fieldData.Topic}'

                Duration Guide      Activity
                10 minutes          Springboard question or activity related to the topic
                10 minutes          Introduction to the topic or continuation of a previous lesson
                10 minutes          Review of previous concepts (if needed)
                20 minutes          Main Discussion: AI to generate an activity for hands-on learning or discussion
                15 minutes          Independent or Guided Activities related to the topic (AI to provide)
                10 minutes          Assessment or Evaluation: AI to suggest ways to assess the understanding
                
                Notes:
                Include pre-lesson reminders or post-discussion observations here.
                `,
              },
            ],
          },
        ],
      };
      
    axios
      .post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const lessonPlan = response.data.candidates[0].content.parts[0].text;
        console.log(lessonPlan)
        localStorage.setItem('lessonPlan',lessonPlan)
        window.location.href='/ViewYourPlan'
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Your Lesson Plan</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="Topic"
            rules={{ required: "Topic is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Photosynthesis" {...field} />
                </FormControl>
                <FormDescription>Main topic of your lesson</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="GradeLevel"
            rules={{ required: "Grade level is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade Level</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 9th Grade" {...field} />
                </FormControl>
                <FormDescription>
                  Target grade level for this lesson
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Concepts"
            rules={{ required: "Main concepts are required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Concepts & Subtopics</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List main concepts and related subtopics"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Break down the main concepts and subtopics to be covered
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Materials"
            rules={{ required: "Materials list is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materials Needed</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List all required materials and resources"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include all materials, equipment, and resources needed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="LearningObjectives"
            rules={{ required: "Learning objectives are required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Objectives</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List the learning objectives"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What students should know or be able to do after the lesson
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="LessonOutline"
            rules={{ required: "Lesson outline is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Outline</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a detailed lesson outline"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Outline the lesson structure, activities, and timing
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Generate Lesson Plan
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="flex-1"
            >
              Clear Form
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GetYourLessonComponent;
