
<template>
    <div class="login-page">

        <!-- Left Section: Branding -->
        <div class="login-branding">
            <h1>BRANDLIVE <span>[TICKETS]</span></h1>

            <div class="branding-content">
                <h2>Experience the Music.<br>Live the Moment.</h2>
                <p>
                    Your gateway to unforgettable concerts,
                    exclusive events, and premium experiences.
                </p>
            </div>

            <p class="branding-footer">
                © 2026 BRANDLIVE TICKETS
            </p>
        </div>

        <!-- Right Section: Login Form -->
        <div class="login-form-section">
            <div class="login-form">

                <h2>Welcome Back!</h2>
                <p>Sign in to continue to your account.</p>

                <form>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                        >
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                        >
                    </div>

                    <div class="form-options">
                        <label>
                            <input type="checkbox">
                            Remember me
                        </label>

                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit" class="login-button">
                        Sign In
                    </button>
                </form>

                <p class="signup-text">
                    Don't have an account?
                    <router-link to="/register" >
                    Settings
                </router-link>
                </p>

            </div>
        </div>

    </div>
</template>
