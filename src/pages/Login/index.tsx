import { Label } from "@radix-ui/react-label";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Icons } from "../../components/ui/icons";
import { Input } from "../../components/ui/input";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserSignIn } from "../../types";
import { useEffect, useState } from "react";
import { useUserAuth } from "../../context/userAuthContext";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";

const initialValue: UserSignIn = {
  email: "",
  password: "",
};

export function Login() {
  const [user, setUser] = useState<UserSignIn>(initialValue);
  const { user: userAuth, googleSignIn, logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(`user info is ${JSON.stringify(user)}`);
      logIn(user.email, user.password);
      console.log("here");
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      console.log("logged in using google");
      navigate("/home");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (userAuth) navigate("/home");
  }, [userAuth]);

  return (
    <div className="bg-slate-800 w-full h-screen">
      <div className="container mx-auto p-6 flex h-full">
        <div className="flex justify-center items-center w-full">
          <div className="p-6 w-2/3 hidden lg:block">
            <div className="grid grid-cols-2 gap-2">
              <img
                className="w-2/3 h-auto aspect-video rounded-3xl place-self-end"
                src={image2}
              />
              <img
                className="w-2/4 h-auto aspect-auto rounded-3xl"
                src={image1}
              />
              <img
                className="w-2/4 h-auto aspect-auto rounded-3xl place-self-end"
                src={image4}
              />
              <img
                className="w-2/3 h-auto aspect-video rounded-3xl"
                src={image3}
              />
            </div>
          </div>
          <div className="max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center mb-4">
                    PhotoGram
                  </CardTitle>
                  <CardDescription>
                    Enter email and password to signin to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid">
                    <Button variant="outline" onClick={handleGoogleSignIn}>
                      <Icons.google className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={user.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit">
                    Sign In
                  </Button>
                  <p className="mt-3 text-sm text-center">
                    Do not have an account ? <Link to="/signup">Sign Up</Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
