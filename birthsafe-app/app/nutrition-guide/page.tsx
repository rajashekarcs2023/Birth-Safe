"use client"

import { useState } from "react"
import { Apple, Search, Info, AlertTriangle, Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function NutritionGuidePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFoods, setSelectedFoods] = useState<string[]>(["spinach", "salmon", "yogurt", "almonds"])

  // Sample data for nutrition recommendations
  const nutritionRecommendations = [
    {
      nutrient: "Folate",
      description: "Essential for preventing neural tube defects",
      dailyNeeds: "600-800 mcg",
      sources: ["leafy greens", "fortified cereals", "beans", "citrus fruits"],
      priority: "high",
    },
    {
      nutrient: "Iron",
      description: "Prevents anemia and supports oxygen transport",
      dailyNeeds: "27 mg",
      sources: ["lean red meat", "beans", "spinach", "fortified cereals"],
      priority: "high",
    },
    {
      nutrient: "Calcium",
      description: "Builds baby's bones and teeth",
      dailyNeeds: "1000 mg",
      sources: ["dairy products", "fortified plant milks", "tofu", "leafy greens"],
      priority: "medium",
    },
    {
      nutrient: "Omega-3 Fatty Acids",
      description: "Supports baby's brain and eye development",
      dailyNeeds: "200-300 mg DHA",
      sources: ["fatty fish", "walnuts", "flaxseeds", "chia seeds"],
      priority: "medium",
    },
    {
      nutrient: "Vitamin D",
      description: "Helps with calcium absorption and immune function",
      dailyNeeds: "600 IU",
      sources: ["sunlight", "fortified milk", "egg yolks", "fatty fish"],
      priority: "medium",
    },
  ]

  // Sample food database
  const foodDatabase = [
    { name: "spinach", nutrients: ["iron", "folate", "calcium"], category: "vegetables" },
    { name: "kale", nutrients: ["calcium", "folate", "vitamin c"], category: "vegetables" },
    { name: "salmon", nutrients: ["omega-3", "vitamin d", "protein"], category: "protein" },
    { name: "eggs", nutrients: ["protein", "vitamin d", "choline"], category: "protein" },
    { name: "yogurt", nutrients: ["calcium", "protein", "probiotics"], category: "dairy" },
    { name: "lentils", nutrients: ["iron", "protein", "folate"], category: "legumes" },
    { name: "almonds", nutrients: ["calcium", "protein", "healthy fats"], category: "nuts" },
    { name: "oranges", nutrients: ["vitamin c", "folate"], category: "fruits" },
    { name: "avocado", nutrients: ["healthy fats", "folate", "potassium"], category: "fruits" },
    { name: "quinoa", nutrients: ["protein", "iron", "fiber"], category: "grains" },
    { name: "chia seeds", nutrients: ["omega-3", "calcium", "fiber"], category: "seeds" },
    { name: "sweet potato", nutrients: ["vitamin a", "fiber", "potassium"], category: "vegetables" },
  ]

  const filteredFoods = searchQuery
    ? foodDatabase.filter(
        (food) =>
          food.name.includes(searchQuery.toLowerCase()) ||
          food.nutrients.some((n) => n.includes(searchQuery.toLowerCase())) ||
          food.category.includes(searchQuery.toLowerCase()),
      )
    : foodDatabase

  const toggleFoodSelection = (foodName: string) => {
    setSelectedFoods((prev) => (prev.includes(foodName) ? prev.filter((f) => f !== foodName) : [...prev, foodName]))
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-700">High Priority</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-700">Medium Priority</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-700">Low Priority</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-full">
          <Apple className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pregnancy Nutrition Guide</h1>
          <p className="text-slate-600">Personalized nutrition recommendations for your pregnancy</p>
        </div>
      </div>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="food-tracker">Food Tracker</TabsTrigger>
          <TabsTrigger value="meal-ideas">Meal Ideas</TabsTrigger>
        </TabsList>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Key Nutrients for Your Pregnancy</CardTitle>
              <CardDescription>Based on your trimester and health profile, focus on these nutrients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nutritionRecommendations.map((rec, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{rec.nutrient}</h3>
                    {getPriorityBadge(rec.priority)}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{rec.description}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Daily needs:</span>
                    <span className="font-medium">{rec.dailyNeeds}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="text-sm font-medium mb-1">Good food sources:</p>
                    <div className="flex flex-wrap gap-1">
                      {rec.sources.map((source, i) => (
                        <Badge key={i} variant="outline" className="bg-white">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="bg-blue-50 border-t">
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  These recommendations are based on general guidelines. Always consult with your healthcare provider
                  about your specific nutritional needs during pregnancy.
                </p>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Foods to Limit or Avoid
              </CardTitle>
              <CardDescription>For the safety of you and your baby</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">High-mercury fish</p>
                    <p className="text-sm text-slate-600">Shark, swordfish, king mackerel, and tilefish</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Raw or undercooked foods</p>
                    <p className="text-sm text-slate-600">Raw meat, eggs, and unpasteurized dairy products</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Alcohol</p>
                    <p className="text-sm text-slate-600">No amount of alcohol is considered safe during pregnancy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Caffeine</p>
                    <p className="text-sm text-slate-600">Limit to 200mg per day (about one 12oz cup of coffee)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Processed foods</p>
                    <p className="text-sm text-slate-600">Limit foods high in salt, sugar, and unhealthy fats</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Food Tracker Tab */}
        <TabsContent value="food-tracker">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Nutrient Progress</CardTitle>
              <CardDescription>Based on your logged foods for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Iron</span>
                  <span className="text-sm text-slate-500">15/27 mg</span>
                </div>
                <Progress value={55} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Folate</span>
                  <span className="text-sm text-slate-500">520/600 mcg</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Calcium</span>
                  <span className="text-sm text-slate-500">750/1000 mg</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Vitamin D</span>
                  <span className="text-sm text-slate-500">300/600 IU</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Omega-3</span>
                  <span className="text-sm text-slate-500">180/200 mg</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Food Tracker</CardTitle>
                  <CardDescription>Log the foods you eat to track nutrients</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search foods or nutrients..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Your Food Log</h3>
                <div className="space-y-2">
                  {selectedFoods.length > 0 ? (
                    selectedFoods.map((food, index) => {
                      const foodData = foodDatabase.find((f) => f.name === food)
                      return (
                        <div key={index} className="flex justify-between items-center bg-slate-50 p-2 rounded-md">
                          <div>
                            <p className="font-medium capitalize">{food}</p>
                            <p className="text-xs text-slate-500 capitalize">{foodData?.nutrients.join(", ")}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFoodSelection(food)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-sm text-slate-500 text-center py-2">No foods logged yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Add Foods</h3>
                <div className="grid grid-cols-2 gap-2">
                  {filteredFoods.map((food, index) => (
                    <div
                      key={index}
                      className={`border rounded-md p-2 cursor-pointer transition-colors ${
                        selectedFoods.includes(food.name) ? "bg-green-50 border-green-200" : "hover:border-slate-300"
                      }`}
                      onClick={() => toggleFoodSelection(food.name)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium capitalize">{food.name}</p>
                        {selectedFoods.includes(food.name) && <Check className="h-4 w-4 text-green-500" />}
                      </div>
                      <p className="text-xs text-slate-500 capitalize">{food.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meal Ideas Tab */}
        <TabsContent value="meal-ideas">
          <Card>
            <CardHeader>
              <CardTitle>Pregnancy-Friendly Meal Ideas</CardTitle>
              <CardDescription>Nutritious and balanced meal suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-3">Breakfast Ideas</h3>
                <div className="grid gap-3">
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Greek yogurt parfait</p>
                    <p className="text-sm text-slate-600 mb-1">
                      Greek yogurt layered with berries, granola, and a drizzle of honey
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        calcium
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        protein
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        antioxidants
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Spinach and cheese omelet</p>
                    <p className="text-sm text-slate-600 mb-1">Eggs with spinach, cheese, and whole grain toast</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        protein
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        iron
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        folate
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">Lunch Ideas</h3>
                <div className="grid gap-3">
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Quinoa salad bowl</p>
                    <p className="text-sm text-slate-600 mb-1">
                      Quinoa with roasted vegetables, chickpeas, and avocado
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        protein
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        fiber
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        healthy fats
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Salmon wrap</p>
                    <p className="text-sm text-slate-600 mb-1">
                      Whole grain wrap with baked salmon, leafy greens, and yogurt dressing
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        omega-3
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        protein
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        vitamin D
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">Dinner Ideas</h3>
                <div className="grid gap-3">
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Lentil and vegetable stew</p>
                    <p className="text-sm text-slate-600 mb-1">
                      Lentils cooked with carrots, celery, tomatoes, and spinach
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        iron
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        protein
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        folate
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Baked fish with sweet potato</p>
                    <p className="text-sm text-slate-600 mb-1">
                      Baked white fish with roasted sweet potato and steamed broccoli
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        protein
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        vitamin A
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        calcium
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">Snack Ideas</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Apple with almond butter</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        fiber
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        protein
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Hummus with vegetables</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        protein
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        fiber
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Greek yogurt with berries</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        calcium
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        antioxidants
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="font-medium">Trail mix with nuts and dried fruit</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="outline" className="bg-white text-xs">
                        healthy fats
                      </Badge>
                      <Badge variant="outline" className="bg-white text-xs">
                        iron
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

