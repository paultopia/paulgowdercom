var nav = {
    methods: {
        focusme: function(){this.$emit('focuspage', this.toggle)}
    }
};

var singleNav = {
    props: ["icon", "word", "toggle"]
};

var doubleNav = {
    props: ["bottomicon", "topicon", "word", "toggle"]
};

module.exports = {doubleNav, singleNav, nav} // let's see if the es6 object shorthand works here